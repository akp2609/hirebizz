import AnalyticsData from "../models/AnalyticsData.js";
import dayjs from "dayjs";
import { getRedisClient } from "../utils/redis.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export const analyticsDataUpdateDownloads = async (req, res) => {
    try {

        let analytics = await AnalyticsData.findOne();

        if (!analytics) {
            analytics = new AnalyticsData();
        }

        analytics.appDownloads += 1;

        const today = new Date();
        const todayDateStr = today.toISOString().split('T')[0];

        let dailyStat = analytics.dailyStats.find(stat => stat.date.toISOString().split('T')[0] === todayDateStr);

        if (!dailyStat) {
            dailyStat = { date: today, downloads: 0, activeUsers: 0 };
            analytics.dailyStats.push(dailyStat);
        }
        dailyStat.downloads += 1;

        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        let monthlyStat = analytics.monthlyStats.find(stat => stat.year === year && stat.month === month);

        if (!monthlyStat) {
            monthlyStat = { year, month, downloads: 0, activeUsers: 0 };
            analytics.monthlyStats.push(monthlyStat);
        }
        monthlyStat.downloads += 1;

        let yearlyStats = analytics.yearlyStats.find(stat => stat.year === year);

        if (!yearlyStats) {
            yearlyStats = { year, downloads: 0, activeUsers: 0 };
            analytics.yearlyStats.push(yearlyStats);
        }
        yearlyStats.downloads += 1;

        await analytics.save();

        return res.status(200).json({
            success: true,
            message: 'Analytics data updated successfully',
            data: analytics
        });

    } catch (error) {
        console.error("Failed to update analytics data", error);
        return res.status(500).json({ message: 'Failed to update analytics data', error: error.message });
    }
}


export const analyticsRecordLogin = async (req, res) => {
    try {
        const { platform, userId } = req.body;
        const now = dayjs().utc();
        const year = now.year();
        const month = now.month() + 1;
        const today = now.startOf("day").toDate();


        let analytics = await AnalyticsData.findOne();
        if (!analytics) {
            analytics = new AnalyticsData();
        }

        analytics.activeUsers += 1;


        if (platform === "android" && !analytics.totalAndroidUsers.includes(userId)) {
            analytics.totalAndroidUsers.push(userId);
        }


        let dailyStat = analytics.dailyStats.find(
            d => {
                const dDate = dayjs(d.date).startOf("day").toDate().getTime();
                return dDate === today.getTime();
            }
        );
        if (!dailyStat) {
            analytics.dailyStats.push({ date: today, activeUsers: 1, downloads: 0 });
        } else {
            dailyStat.activeUsers += 1;
        }


        let monthlyStat = analytics.monthlyStats.find(
            m => m.year === year && m.month === month
        );
        if (!monthlyStat) {
            analytics.monthlyStats.push({ year, month, activeUsers: 1, downloads: 0 });
        } else {
            monthlyStat.activeUsers += 1;
        }


        let yearlyStat = analytics.yearlyStats.find(y => y.year === year);
        if (!yearlyStat) {
            analytics.yearlyStats.push({ year, activeUsers: 1, downloads: 0 });
        } else {
            yearlyStat.activeUsers += 1;
        }

        await analytics.save();
        return res.status(200).json({ message: "Login recorded successfully" });

    } catch (error) {
        console.error("Failed to record login", error);
        return res.status(500).json({ message: "Failed to record login", error: error.message });
    }
};


export const analyticsRecordLogout = async (req, res) => {
    try {

        let analytics = await AnalyticsData.findOne();
        if (!analytics) {
            return res.status(404).json({ message: "Analytics data not found" });
        }


        analytics.activeUsers = Math.max(0, analytics.activeUsers - 1);


        await analytics.save();
        return res.status(200).json({ message: "Logout recorded successfully" });

    } catch (error) {
        console.error("Failed to record logout", error);
        return res.status(500).json({ message: "Failed to record logout", error: error.message });
    }
};

export const analyticsRecordFailedLogin = async (userId, ipaddress, reason = "internal server error") => {
    try {

        const failedLogin = {
            userId,
            ipaddress,
            reason,
            date: new Date()
        };

        let analytics = await AnalyticsData.findOne();
        if (!analytics) {
            analytics = new AnalyticsData();
        }
        analytics.failedLoginAttempts.push(failedLogin);

        await analytics.save();


    } catch (error) {
        console.error("Failed to record failed login", error);

    }
}

export const recordHourlyActiveUser = async (userId) => {
    const redisClient = getRedisClient();
    const now = dayjs().utc();
    const hourKey = `active_users:${now.format("YYYY-MM-DD:HH")}`;

    await redisClient.sAdd(hourKey, userId.toString());
    await redisClient.expire(hourKey, 48 * 60 * 60);
}

export const getHourlyActiveCount = async (req, res) => {
    const redisClient = getRedisClient();
    const dateTime = req.query.dateTime ? new Date(req.query.dateTime) : new Date();
    if (isNaN(dateTime.getTime())) {
        return res.status(400).send({ message: "Invalid dateTime parameter" });
    }

    const hourKey = `active_users:${dayjs(dateTime).utc().format("YYYY-MM-DD:HH")}`;
    const count = await redisClient.sCard(hourKey);

    return res.json({ count });
};
