﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using SignUpService.Model;

namespace SignUpService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IContact
    { 
        [OperationContract]
        [WebInvoke(Method = "*",
            UriTemplate = "GetContactList",
            BodyStyle = WebMessageBodyStyle.Wrapped,
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json)]
        ReturnValueInfo<IList<CustomerInfo>> GetContactList(CustomerInfo custInfo);

        [OperationContract]
        [WebInvoke(Method = "*",
            UriTemplate = "AddUpdateContactDetails",
            BodyStyle = WebMessageBodyStyle.Wrapped,
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json)]
        ReturnValueInfo<int> AddUpdateContactDetails(CustomerInfo custInfo);

        [OperationContract]
        [WebInvoke(Method = "*",
            UriTemplate = "DeleteContact",
            BodyStyle = WebMessageBodyStyle.Wrapped,
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json)]
        ReturnValueInfo<int>DeleteContact(CustomerInfo custInfo);

        
    } 
}
