<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="DemoWebApp.Default" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Contact Detail</title>
    <link rel="stylesheet" href="<%= Page.ResolveUrl("~/Assets/CSS/bootstrap.min.css") %>" />
    <link rel="stylesheet" href="<%= Page.ResolveUrl("~/Assets/CSS/myapp-ui.css") %>" />
    <script src="<%= Page.ResolveUrl("~/Assets/JS/jquery_lib_3.3.1.js") %>"></script>
    <script src="<%= Page.ResolveUrl("~/Assets/JS/bootstrap.min.js") %>"></script>
    <script src="<%= Page.ResolveUrl("~/Assets/JS/myapp-ui.js") %>"></script>
    <script src="<%= Page.ResolveUrl("~/Assets/JS/Contact.js") %>"></script>
</head>
<body>
    <form id="form1" runat="server" onsubmit="return false;">
          <div class="col-lg-12">
              <div class="col-lg-12" id="divContactList">
                  <div class="page-header">
							<h3> Contact <small>
									<i class="icon-double-angle-right"></i>
									Mange Contact Details
								</small>
							</h3>
						</div>
                  <div class="container">
                    <table class="table table table-striped table-bordered table-hover" id="tblcustomerDetail">
                        <thead> <tr> <th>First Name</th> <th>Middel Name</th> <th>Last Name</th> <th>Email </th> <th>Phone</th> <th>Inactive Status</th> <th>Action</th></tr> </thead>
                        <tbody id="tblbodycustomerDetail"> </tbody> 
                    </table>
                        <div class="col-lg-12 no-padding-right"  align="right"> <button id="btnAddNewContact" type="button">Add New Contact</button> </div>
               </div> 
              </div>
            
          </div>
<div class="row"></div>  

<div id="ModalContact" class="modal" tabindex="-1" data-backdrop="static" data-keyboard="true" rel="true" >
                            <div class="modal-dialog">
                                
                                <div class="modal-content">
                                    <div class="modal-header no-padding-bottom no-padding-top no-padding-right">
                                         <h4>Contact information </h4>
                                        <button class="close modal-close-button"  data-dismiss="modal" type="button"  ><img style="height:1 5px;width:15px;top:10px;position:absolute;right:1%;" src="Assets/img/close.png" /></button>
                                        <h4 class="blue bigger"><span id="spnModalLocationHeader">    </span> </h4>
                                    </div>

                                    <div class="modal-body overflow-visible no-padding">
        <div class="row">
          
        <div class="col-lg-12" id="divContactInfo" >
       <label id="lblvalidationMessage" class="text-danger"></label>
        <div class="form-group">
            <div class="col-lg-12">
                <label class="control-label" for="cname"> First Name: <span class="text-danger">*</span> </label>
                <input type="text" maxlength="50" id="txtFirstName" class="onlycharacter form-control validate[required, maxSize[150]]  " data-errormessage-value-missing="Location name required!" />
                <input  type="hidden" id="hiddenContactDetailUID"/>
            </div>
             <div class="col-lg-12">
                <label class="control-label"> Last Name:<span class="text-danger">*</span></label>
                <input type="text" maxlength="50" id="txtmiddleName"  class="onlycharacter form-control validate[required, maxSize[150]]  " data-errormessage-value-missing="Location Id required!" />
            </div>

            <div class="col-lg-12">
                <label class="control-label"> Last Name:<span class="text-danger">*</span></label>
                <input type="text" maxlength="50" id="txtLastName"  class="onlycharacter form-control validate[required, maxSize[150]]  " data-errormessage-value-missing="Location Id required!" />
            </div>
        </div>
        <div class="separater"> </div>
        <div class="form-group">
            <div class="col-lg-12">
                <label class="control-label" for="cname">
                    Email :<span class="text-danger">*</span></label>
                <input type="text" maxlength="50" id="txtEmail"  class="form-control validate[required, maxSize[150]] email" data-errormessage-value-missing="Email Id required!" />
                                     
            </div>
            <div class="col-lg-12">
                <label class="control-label"> Phone Number:  </label>
                <input type="text" class="onlynumber form-control validate[maxSize[255]]" maxlength="10" id="txtPhoneNumber" placeholder="" data-errormessage-value-missing="Phone Number required!"></input>
                 
            </div>
        </div>
        <div class="separater"> </div>
        <div class="form-group">
            <div class="col-lg-12">
                <label class="control-label" for="cname">
                        Status:<span class="text-danger">*</span></label>
                <select id="ddlnactiveStatus" class="form-control validate[required]" data-errormessage-value-missing="Status required!"  style="height:30px;">
                    <option value="">- Select -</option>
                    <option value="0">Active</option>
                    <option value="1">In Active</option>
                </select>
            </div>
            
        </div>
        <div class="separater"> </div>
        <div class="form-group">
            <div class="col-lg-12" align="right">
                 <button type="button" id="btnSubmitContactDetail">Submit</button>
                <button  data-dismiss="modal">  <i class="icon-remove"></i> Cancel </button> 
            </div>
            
        </div>

   </div>
  
  
      </div></div></div></div></div>

<script type="text/javascript"> var _baseGlobleServiceurl = '<%=BaseGlobleServiceURL%>';
</script>      

    </form>
</body>
</html>
