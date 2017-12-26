
var DATABASE = "HotelBookingReservationsSystem";
var DB_HOST = "localhost";
var DB_PORT = "27017";

var SPRING_SERVER_URL = "http://localhost:8080/Hotel-booking-and-reservations-system-admin/"
var SPRING_API_URL = SPRING_SERVER_URL + "api/"

var RESTAURANT_API = 'restaurant/'
var ROOM_API = 'rooms/'
var ROOM_NAME_API = 'rooms/roomname/'

exports.RESTAURANT_API_URL = SPRING_API_URL + RESTAURANT_API
exports.ROOM_API_URL = SPRING_API_URL + ROOM_API
exports.ROOM_NAME_API_URL = SPRING_API_URL + ROOM_NAME_API

exports.MAIL_SERVICE = 'gmail';
exports.MAIL_USER = 'cuongvip1295@gmail.com';
exports.MAIL_AUTH = 'ititiu13170';
exports.HEADER_MAIL = 'test header mail';
exports.FOOTER_MAIL = 'test footer mail';

exports.DB_CONNECTION = "mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DATABASE;
exports.DB_CONNECT_SUCCESS = 'connection succesful';
exports.SERCRET = 'dohungcuong';
exports.PORT = 3000;
exports.RESOURCE = 'public';
exports.VIEW = 'views';
exports.VIEW_FILE_EXTENSION = 'ejs';
exports.ANGULAR_DIR = '/dist';
exports.LOGGER ='dev';
exports.PAGE404 = 'Not Found';
exports.APP_RUNNING_RESULT = "App now running on port";
exports.ERROR_MES = 'err_msg';
exports.SUCCESS_MES = 'success_msg';
exports.USER_API = '/api/users';
exports.ACTIVITY_API = '/api/activity';
exports.FOLLOW_USER_API = '/api/follow-users';

exports.SIGNUP_SUCESS = 'sign up successfully: ';
exports.TKS_SIGNUP = 'Thank you for join us! You are able to use premium feature!'
exports.ACCOUNT_INIT = 'You are having $500 in your account';
exports.BALANCE_INIT = 500;
exports.SIGNUP_DETAIL = 'You have signed up with email ';
exports.NO_RES = "Not Yet";
exports.ACCOUNT_USED = 'sign up failed: exist account: ';
exports.SIGN_UP_FAIL = 'sign up failed: ';
exports.EMAIL_TAKEN = 'This username is already taken';
exports.SIGNUP_ERR = 'sign up failed: cannot check users';
exports.SIGNUP_INVALID = 'sign up failed: validation form not accepted';
exports.CHANGE_PW_FAIL = 'Change password failed: ';
exports.CHANGE_PW_SUCCESS = 'Change password successfully';
exports.CHANGE_PW_DETAIL = 'You have change your password';
exports.CHANGE_PW_NOTE = 'Please remeber your new password';
exports.CHANGE_PW_CONTENT = 'Password Changed Successfully';

exports.INPUT_USERNAME = 'Please input your username';
exports.INPUT_PASSWORD = 'Please input your password';
exports.INVALID_PASSWORD = 'Password must be from 8-30 character';
exports.INPUT_EMAIL = 'Username must be your email';
exports.INPUT_NEW_PASSWORD = 'Please input the new password';
exports.CONFIRM_PW = 'Confirm must be the same with password';
exports.PW_NOT_CHANGE = 'Your new password is the same as old password';
exports.INPUT_NAME = 'Please input your full name';
exports.INPUT_PHONE = 'Please input your phone number';
exports.PHONE_INVALID = 'Phone number must be digits only';
exports.INPUT_ADDRESS = 'Please input your address';
exports.CLICK_REGISTER = 'click page /register';
exports.CLICK_ChANGE_PW = "click page /change-password";
exports.LOGIN_SUCCESS = 'login success: ';
exports.LOGIN_FAIL = 'login failed: ';
exports.CLICK_LOGIN = 'click page /login';
exports.CLICK_LOGOUT = 'click page /logout';
exports.INVALID_USERNAME = "Invalid Username";
exports.WRONG_PW = "Wrond password!!";
exports.DEFAULT_IP = "2.31.255.255";
exports.DEFAULT_ROOM_PRICE = 100
exports.DEFAULT_ROOM_SIZE = 100
exports.DEFAULT_ROOM_AMINITY = 150
exports.NUM_TRACKING_EACH_PAGE = 10;