// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb+srv://marco:marcoqwerty@mycluster.tbpvb.mongodb.net/marco?retryWrites=true&w=majority",
    JWT_SECRET: "kgowiudnwejnc",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/cloud-name/image/upload",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
