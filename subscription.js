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
    },
    error: function () {
      console.log("error for the url : ");
      alert("Exception while updating");
    },
  });
}

function change(el) {
  console.log("Inside change");
  console.log("el = " + el.content);
  var subscriptionStatusRequest = new SubscriptionStatusRequest();
  if (el.value === "Opt back in") {
    el.value = "Opt back out";
    subscriptionStatusRequest.status = "SUBSCRIBED";
  } else {
    el.value = "Opt back in";
    subscriptionStatusRequest.status = "UNSUBSCRIBED";
  }

  console.log(
    "SubscriptionStatusRequest status is : " + subscriptionStatusRequest.status
  );

  var token = "abcdefgh";
  var encodedStringAtoB = "KzM0NjY2MTE1NjA3";
  var notificationref = atob(encodedStringAtoB);
  console.log("token is : " + token);
  console.log("notificationref is : " + notificationref);
  updateSubscription(subscriptionStatusRequest, notificationref, token);
}
