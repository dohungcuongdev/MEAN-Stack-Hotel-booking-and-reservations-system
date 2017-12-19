import * as AppConst from '../constant/app.const';
declare var swal: any;

export class ValidationService {

  constructor() {

  }

  ValidateEmail(inputText) {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (inputText.value.match(mailformat)) {
        return true;
      }
      else {
        alert("You have entered an invalid email address!");
        return false;
      }
  }
  
  swAlertInputToBookNow() {
    swal(AppConst.INPUT_CHECKIN_CHECKOUT)
  }

  swAlertEmailSent() {
    swal(AppConst.CONGRATS, AppConst.MES_SENT_SUCCESS, AppConst.SUCCESS)
  }

  swAlertNotEnoughInput() {
    this.swAlertErr(AppConst.NOT_ENOUGH_INFOR)
  }

  swAlertErr(content: string) {
    swal(AppConst.ERR_TITLE, content, AppConst.ERR)
  }
  
  swAlertFeedbackSent() {
    swal(AppConst.TKS_FB, AppConst.FB_SENT_SUCCESS, AppConst.SUCCESS)
  }

  swAlertUsualErr(err: string) {
    swal(AppConst.ERR_TITLE, AppConst.ERROR, AppConst.ERR)
    console.log(err)
  }

  swAlert(content: string) {
    swal(content)
  }

  swAlertEditSuccess() {
    swal(AppConst.CONGRATS, AppConst.EDIT_INFOR_SUCCESS, AppConst.SUCCESS)
  }

  swAlertNoCheckDate() {
    this.swAlertUsualErr(AppConst.NO_CHECKIN_CHECKOUT)
  }

  swAlertBookUpToDate() {
    this.swAlertUsualErr(AppConst.UP_TO_DATE)
  }

  swAlertBookOutOfDate() {
    this.swAlertUsualErr(AppConst.OUT_OF_DATE)
  }

  swAlertCannotPay() {
    swal("Oops...", AppConst.CANNOT_PAY, "error")
  }

  swAlertBookSuccess() {
    swal('Congrats!', AppConst.BOOK_SUCCESS, 'success')
  }
}














