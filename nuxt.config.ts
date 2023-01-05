// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // IAM token secrets. Please rotate every 2 - 4 weeks
    iamAccessTokenSecret: process.env.IAM_ACCESS_TOKEN_SECRET,
    iamRefreshTokenSecret: process.env.IAM_REFRESH_TOKEN_SECRET,
    iamResetTokenSecret: process.env.IAM_RESET_TOKEN_SECRET,

    // IAM Email Options
    iamEmailer: process.env.IAM_EMAILER,
    iamPublicUrl: process.env.IAM_NODEMAILER_URL,

    // IAM Nodemailer email
    iamNodemailerHost: process.env.IAM_NODEMAILER_HOST,
    iamNodemailerPort: process.env.IAM_NODEMAILER_PORT,
    iamNodemailerService: process.env.IAM_NODEMAILER_SERVICE,
    iamNodemailerSender: process.env.IAM_NODEMAILER_SENDER,
    iamNodemailerPassword: process.env.IAM_NODEMAILER_PASSWORD,

    // IAM SendGrid API KEY
    iamSendGridApiKey: process.env.IAM_SENDGRID_API_KEY,

    // Do not put secret information here
    public: {
      iamClientPlatform: process.env.IAM_CLIENT_PLATFORM,
      iamVerifyRegistrations: process.env.IAM_VERIFY_REGISTRATIONS,
    },
  },

  typescript: {
    shim: false,
  },
});
