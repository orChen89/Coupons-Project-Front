class Config {

}

class DevelopmentConfig extends Config {

    public allCouponsUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/coupons/"

    public registerCustomerUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/auth/register/customer"

    public loginUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/auth/login"

    public couponDeletionUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/company/"

    public createCouponUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/company"

    public registerCompanyUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/auth/register/company"

    public customersMyCouponsUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/customer/get-coupons/"

    public customersBuyCouponUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/customer/"

    public companyCouponsUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/company/get-coupons/"

    public getCustomerUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/customer/"

    public getCompanyrUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/company/"

    public getAllCompaniesUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/company"

    public createCompanyUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/company"

    public deleteCompanyUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/company/"

    public deleteCustomerUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/customer/"

    public getAllCustomersUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/customer"

    public createCustomerUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/customer"

}

class ProductionConfig extends Config {

    public allCouponsUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/coupons/"

    public registerCustomerUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/auth/register/customer"

    public loginUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/auth/login"

    public couponDeletionUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/company/"

    public createCouponUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/company"

    public registerCompanyUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/auth/register/company"

    public customersMyCouponsUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/customer/get-coupons/"

    public customersBuyCouponUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/customer/"

    public companyCouponsUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/company/get-coupons/"

    public getCustomerUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/customer/"

    public getCompanyrUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/company/"

    public getAllCompaniesUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/company"

    public createCompanyUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/company"

    public deleteCompanyUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/company/"

    public deleteCustomerUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/customer/"

    public getAllCustomersUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/customer"

    public createCustomerUrl = "http://Couponsproject-env.eba-zghfe3vb.ap-northeast-1.elasticbeanstalk.com/admin/customer"
}


const appConfig = process.env.NODE_ENV === "production" ? new DevelopmentConfig() : new ProductionConfig();

export default appConfig;