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
    try {
        console.log(`=== RECORDING HOURLY ACTIVE USER ===`);
        console.log(`User ID: ${userId}`);
        console.log(`Current UTC time: ${dayjs().utc().format("YYYY-MM-DD HH:mm:ss")}`);
        
        const redisClient = getRedisClient();
        const now = dayjs().utc();
        const hourKey = `active_users:${now.format("YYYY-MM-DD:HH")}`;

        console.log(`Redis key: ${hourKey}`);
        
        // Test Redis connection first
        await redisClient.ping();
        console.log(`Redis connection: OK`);
        
        const result = await redisClient.sAdd(hourKey, userId.toString());
        console.log(`sAdd result: ${result} (1 = new member, 0 = already exists)`);
        
        await redisClient.expire(hourKey, 48 * 60 * 60);
        console.log(`Set expiration: 48 hours`);
        
        // Verify it was added
        const count = await redisClient.sCard(hourKey);
        const members = await redisClient.sMembers(hourKey);
        console.log(`Total active users for ${hourKey}: ${count}`);
        console.log(`All members: ${JSON.stringify(members)}`);
        console.log(`======================================`);
        
    } catch (error) {
        console.error('Error recording hourly active user:', error);
        throw error;
    }
}


export const processAndStoreHourlyData = async (req, res) => {
    try {
        const redisClient = getRedisClient();
        const dateTime = req.query.dateTime ? dayjs(req.query.dateTime).utc() : dayjs().utc().subtract(1, 'hour');
        
        if (!dateTime.isValid()) {
            return res.status(400).send({ message: "Invalid dateTime parameter" });
        }

        const hourKey = `active_users:${dateTime.format("YYYY-MM-DD:HH")}`;
        const count = await redisClient.sCard(hourKey);

        
        await storeHourlyDataInMongoDB(dateTime, count);

        console.log(`Stored hourly data: ${count} active users for ${dateTime.format("YYYY-MM-DD HH:00")}`);
        
        return res.json({ 
            success: true,
            count, 
            timestamp: dateTime.format("YYYY-MM-DD HH:00"),
            stored: true 
        });
        
    } catch (error) {
        console.error('Error processing hourly data:', error);
        return res.status(500).json({ error: 'Failed to process hourly data' });
    }
};

const storeHourlyDataInMongoDB = async (dateTime, activeUsers) => {
    try {
        
        let analyticsDoc = await AnalyticsData.findOne({}) || new AnalyticsData({});
        
        const year = dateTime.year();
        const month = dateTime.month() + 1; 
        const day = dateTime.date();
        const hour = dateTime.hour();
        
        
        const existingHourIndex = analyticsDoc.hourlyStats.findIndex(stat => 
            stat.year === year && 
            stat.month === month && 
            stat.day === day && 
            stat.hour === hour
        );
        
        if (existingHourIndex !== -1) {
            
            analyticsDoc.hourlyStats[existingHourIndex].activeUsers = activeUsers;
            analyticsDoc.hourlyStats[existingHourIndex].timestamp = dateTime.toDate();
        } else {
            
            analyticsDoc.hourlyStats.push({
                year,
                month,
                day,
                hour,
                activeUsers,
                timestamp: dateTime.toDate()
            });
        }
        
        
        const thirtyDaysAgo = dayjs().utc().subtract(30, 'days');
        analyticsDoc.hourlyStats = analyticsDoc.hourlyStats.filter(stat => 
            dayjs(stat.timestamp).isAfter(thirtyDaysAgo)
        );
        
        await analyticsDoc.save();
        
    } catch (error) {
        console.error('Error storing hourly data in MongoDB:', error);
        throw error;
    }
};
