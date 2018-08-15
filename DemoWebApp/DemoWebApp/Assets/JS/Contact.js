////  Static Rest Service URL 

//// bind static functions in IIF function
$(function () {
    // Validate only charectors
    $('.onlycharacter').on('keypress', function (e) {
        e = e || window.event;
        var code = e.which || e.ckeyCode;
        return /^[a-z]$/i.test(String.fromCharCode(code));
    });
    // Validate only numbers
    $('.onlynumber').on('keypress', function (e) {
        e = e || window.event;
        var code = e.which || e.ckeyCode;
        return /^[0-9]$/i.test(String.fromCharCode(code));
    });

    // Validate inputs with values 
    $("#divContactInfo input,select").focusout(function () {
        if ($(this).val().length === 0)
            $(this).addClass("invalid-field");
        else {
            $(this).removeClass("invalid-field").addClass("valid-field");
            if ($("#divContactInfo input.invalid-field,select.invalid-field").length == 0)
                $("#lblvalidationMessage").empty();
        }
    });

    // Add/bind  event
    $("#btnAddNewContact").click(function () { ClearinputValues(); $("#ModalContact").modal("show"); });
    $("#btnSubmitContactDetail").click(function () { ValidateAndSave(); });

    // Get load all Contact list
    GetAllContactList();
});
//// bind functions end

// Validate all fields and Save in DB 
function ValidateAndSave() {

    if ($("#divContactInfo input[type=text].valid-field,select.valid-field").length === $("#divContactInfo input[type=text],#divContactInfo select").length) {
        if (validateEmail($("#txtEmail").val())) { AddupdateContact(); }
        else
            $("#lblvalidationMessage").html("* Please enter valid email address.");
    }
    else {
        $("#divContactInfo input[type=text],#divContactInfo select").each(function () {
            if (this.value === '')
                $(this).addClass("invalid-field");
        });
        $("#lblvalidationMessage").html("* Fields are required.");
    }
}

// Add Update Valid Contact  
function AddupdateContact() {
    var requestJson = {
        custInfo: {
            ContactDetailUID: $("#hiddenContactDetailUID").val() != "" ? $("#hiddenContactDetailUID").val() : "",
            First: $("#txtFirstName  ").val() != "" ? $("#txtFirstName").val() : "",
            Middle: $("#txtmiddleName ").val() != "" ? $("#txtmiddleName").val() : "",
            Last: $("#txtLastName	  ").val() != "" ? $("#txtLastName").val() : "",
            Email: $("#txtEmail	  ").val() != "" ? $("#txtEmail").val() : "",
            PhoneNo: $("#txtPhoneNumber").val() != "" ? $("#txtPhoneNumber").val() : "",
            InactiveStatus: $("#ddlnactiveStatus").val() != "" ? $("#ddlnactiveStatus").val() : "",
        },
        url: _baseGlobleServiceurl + 'ContactService.svc/Contact/AddUpdateContactDetails',
        callback: {
            success: function (data) {
                var output = data.AddUpdateContactDetailsResult.ReturnValue;
                if (output > 0) {
                    GetAllContactList();
                    ClearinputValues();
                    $("#ModalContact").modal("hide");
                    myapp.alert({
                        title: "Data Saved",
                        htmlBody: "<span style='color:#468847'>Data saved successfully.<span>"
                    });

                }
            }
              , error: function (data, info) {
                  myapp.alert({
                      title: "Error",
                      htmlBody: "<span class='red'>Something went wrong please try after some time. <br /><a href='#' onclick=$('#errorpan').toggleClass('show');>Read more..<span  id='errorpan' class='hide'>" + JSON.stringify(data) + "</span></a></span>"
                  });
            }
        }
    };
    myapp.ajax(requestJson);
}

// Get All Contact List 
function GetAllContactList() {
    var requestJson = {
        custInfo: { },
        url: _baseGlobleServiceurl + 'ContactService.svc/Contact/GetContactList',
        callback: {
            success: function (data) {
                var output = data.GetContactListResult.ReturnValue;
                var _html = "";
                if (output.length > 0) {
                    $(output).each(function (idx, element) {
                        var status = JSON.parse(element.InactiveStatus) === true ? "Inactive" : "Active";
                        _html += "<tr id=tr_" + element.ContactDetailUID + "> <td>" + element.First + "</td> <td>" + element.Middle + "</td> <td>" + element.Last + "</td> <td>" + element.Email + "</td> <td>" + element.PhoneNo + "</td>"; //
                        _html += "<td>" + status + "</td> <td><a class='ClsContactdetailsAction' data-action='edit'  href='#' data-contactuid='" + element.ContactDetailUID + "'>Edit</a>  /  <a href='#' class='ClsContactdetailsAction' data-action='delete'  data-contactuid='" + element.ContactDetailUID + "'>Delete</a></td>";
                    });
                    $("#tblbodycustomerDetail").html(_html);
                    $("#tblcustomerDetail .ClsContactdetailsAction").click(function () { debugger;
                        objecttoAction =$(this).attr("data-contactuid")
                        if ($(this).attr("data-action").toLowerCase()==='edit') {
                            GetSelectedContactInfo(objecttoAction);
                        }
                       else if ($(this).attr("data-action").toLowerCase()==='delete') {
                           myapp.confirm({
                               title: "<span style='color:#A45;'><i class='icon-warning-sign'>&nbsp;</i>Confirm</span>",
                               htmlBody: "Are you sure you want to delete this record!",
                               callback:  
                                    function (result) {
                                        if (result) { DeleteContact(objecttoAction); }
                                    }
                           });
                        }
                    })
                }
                else { $("#tblbodycustomerDetail").html("<tr id=tr_1'> <td colspan='7'><center> No records found...</center></td></tr>"); }
            }
            , error: function (data,info) {
                myapp.alert({
                    title: "Error",
                    htmlBody: "<span class='red'>Something went wrong please try after some time. <br /><a href='#' onclick=$('#errorpan').toggleClass('show');>Read more..<span  id='errorpan' class='hide'>" + JSON.stringify(data) + "</span></a></span>"
                }); 
            }
        }
    };
    myapp.ajax(requestJson);
}

// Get selected Contact object
function GetSelectedContactInfo(requestParam) {
    var requestJson = {
        custInfo: {ContactDetailUID:requestParam},
        url: _baseGlobleServiceurl + 'ContactService.svc/Contact/GetContactList',
        callback: {
            success: function (data) { 
                ClearinputValues();
                $("#ModalContact").modal("show");
                var output = data.GetContactListResult.ReturnValue[0];
                $("#hiddenContactDetailUID").val(output.ContactDetailUID)
                $("#txtFirstName").val(output.First)
                $("#txtmiddleName").val(output.Middle)
                $("#txtLastName").val(output.Last)
                $("#txtEmail").val(output.Email)
                $("#txtPhoneNumber").val(output.PhoneNo)
                var status = JSON.parse(output.InactiveStatus) === true ? "1" : "0";
                $("#ddlnactiveStatus").val(status);
                $("#divContactInfo input[type=text],select").addClass("valid-field");
            }
              , error: function (data, info) {
                  myapp.alert({
                      title: "Error",
                      htmlBody: "<span class='red'>Something went wrong please try after some time. <br /><a href='#' onclick=$('#errorpan').toggleClass('show');>Read more..<span  id='errorpan' class='hide'>" + JSON.stringify(data) + "</span></a></span>"
                  });
            }}
    };
    myapp.ajax(requestJson);
}

// Delete contact object
function DeleteContact(objecttoDelete) {  //
    var requestJson = {
        custInfo: { ContactDetailUID: objecttoDelete },
        url: _baseGlobleServiceurl + 'ContactService.svc/Contact/DeleteContact',
        callback: {
            success: function (data) {
                var output = data.DeleteContactResult.ReturnValue;
                if (output > 0) {
                    GetAllContactList();
                    myapp.alert({
                        title: "<span style='color:#A45;'><i class='icon-warning-sign'>&nbsp;</i>Data Deleted</span>",
                        htmlBody: "Data deleted successfully."
                    });
                }
            }
              , error: function (data, info) {
                  myapp.alert({
                      title: "Error",
                      htmlBody: "<span class='red'>Something went wrong please try after some time. <br /><a href='#' onclick=$('#errorpan').toggleClass('show');>Read more..<span  id='errorpan' class='hide'>" + JSON.stringify(data) + "</span></a></span>"
                  });
              }
        }
    };
    myapp.ajax(requestJson);
}

// Get validate email with valid pattern.
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// clear all of the inputs
function ClearinputValues()
{
    $("#hiddenContactDetailUID").val('');
    $("#hiddenContactDetailUID").val('');
    $("#txtFirstName").val('');
    $("#txtmiddleName").val('');
    $("#txtLastName").val('');
    $("#txtEmail").val('');
    $("#txtPhoneNumber").val('');
    $("#ddlnactiveStatus").val('');
    $("#divContactInfo input.invalid-field,select.invalid-field").removeClass("invalid-field");
    $("#lblvalidationMessage").html('');
    $("#divContactInfo input[type=text].valid-field,select.valid-field").removeClass("valid-field")
}
