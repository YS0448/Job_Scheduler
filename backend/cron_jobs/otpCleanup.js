const { executeQuery } = require('../utils/db/dbUtils');
const cron = require('node-cron');
const logger = require('../utils/logger'); 

// OTP cleanup function
const otpCleanup = async () => {
  try {
    const deleteQuery = `
      DELETE FROM manage_otp 
      WHERE created_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 5 MINUTE);
    `;
    const result = await executeQuery(deleteQuery);
    logger.info('[OTP Cleanup] 🗑️ Deleted expired OTPs. Rows affected: %d', result.affectedRows || 0);
  } catch (error) {
    logger.error('[OTP Cleanup] ❌ Error during OTP cleanup: %o', error);
  } finally {
    logger.info('[OTP Cleanup] 🕒 OTP Cleanup job completed.');
  }
};

// Schedule cron job to run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  logger.info('[CRON] 🕒 OTP Cleanup job triggered');
  await otpCleanup();
});

module.exports = otpCleanup;
