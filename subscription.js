function updateSubscription(subscriptionStatusRequest, notificationref, token) {
  console.log(
    "updateSubscription for the status : " + subscriptionStatusRequest.status
  );
  console.log("token is : " + token);
  console.log("notificationref is : " + notificationref);

  var jsonData = { status: subscriptionStatusRequest.status };

  $.ajax({
    url:
      "http://localhost:8080/v1/sms/subscription/" +
      notificationref +
      "/" +
      token,
    type: "PUT",
    dataType: "json",
    data: JSON.stringify(jsonData),
    contentType: "application/json;",
    success: function (data, ref, tok) {
      console.log("success");
      window.location.reload();
    },
    error: function () {
      console.log("error for the url : ");
    },
  });
}

function change(el) {
  console.log("Inside change");
  console.log("el = " + el.content);
  console.log("The URL of this page is: " + window.location.href);
  var subscriptionStatusRequest = new SubscriptionStatusRequest();
  if (el.value === "Opt back in") {
    el.value = "Opt back out";
    isSubscribed = true;
    document.getElementById("opt-out").hidden = true;
    subscriptionStatusRequest.status = "SUBSCRIBED";
  } else {
    el.value = "Opt back in";
    subscriptionStatusRequest.status = "UNSUBSCRIBED";
    document.getElementById("opt-in").hidden = true;
  }

  console.log(
    "SubscriptionStatusRequest status is : " + subscriptionStatusRequest.status
  );

  var splitUrl = window.location.href.split("/");

  var token = splitUrl[splitUrl.length - 1];
  console.log("token is: " + token);

  var encodedStringAtoB = splitUrl[splitUrl.length - 2];
  console.log("encodedStringAtoB is: " + encodedStringAtoB);
  var notificationref = atob(encodedStringAtoB);

  updateSubscription(subscriptionStatusRequest, notificationref, token);
}



window.onload = function exampleFunction() {
  console.log("The page is loading");

  var splitUrl = window.location.href.split("/");
  var encodedStringAtoB = splitUrl[splitUrl.length - 2];
  console.log("encodedStringAtoB is: " + encodedStringAtoB);
  var phoneNumber = atob(encodedStringAtoB);

  //var jsonData = { phoneNumber: phoneNumber };

  $.ajax({
    url: "http://localhost:8080/v1/sms/subscription-status",
    type: "GET",
    data: { phoneNumber: phoneNumber },
    contentType: "application/json;",
    success: function (response) {
      console.log(response);
      console.log(
        "phoneNumber " + phoneNumber + " is " + response.subscriptionStatus
      );

      $("#outer-rectangle").show();

      var isSubscribed = false;
      if (response.subscriptionStatus === "SUBSCRIBED") {
        isSubscribed = true;
        console.log("isSubscribed : " + isSubscribed);
        $("#opt-in").show();
        $("#optin-message").show();
        $("#optout-button").show();
        $("#optin-message").text($("#optin-message").text() + phoneNumber);
      }
      if (response.subscriptionStatus === "UNSUBSCRIBED") {
        console.log("isSubscribed : " + isSubscribed);
        $("#opt-out").show();
        $("#optout-message").show();
        $("#optin-button").show();
        $("#optout-message").text($("#optout-message").text() + phoneNumber);
      }
    },
    error: function () {
      console.log("error for the url : ");
    },
  });

  function closewindow() {
    console.log("Inside closewindow");
    window.close();
  }

};
