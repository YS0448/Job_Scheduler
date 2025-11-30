const {executeQuery} = require('../utils/db/dbUtils');
const cron= require('node-cron');


const otpCleanup = async (next) => {
  try {
    const deleteQuery = `DELETE FROM manage_otp WHERE created_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 5 MINUTE);`;
    const result = await executeQuery(deleteQuery);
    console.log(`[OTP Cleanup] 🗑️ Deleted expired OTPs. Rows affected: ${result.affectedRows || 0}`);
  } catch (error) {
    console.error('Error during OTP cleanup:', error);
    next(error);
  } finally{
    console.log(`[OTP Cleanup] 🕒 OTP Cleanup job completed.`);
  }
};

// Schedule cron job to run every 5 minutes
cron.schedule('*/5 * * * *', async() => {    
  console.log(`[CRON] 🕒 OTP Cleanup job triggered }`);  
  await otpCleanup();
})    

module.exports = otpCleanup;