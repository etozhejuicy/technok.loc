$(document).ready(function () {
  let csrfToken = $('meta[name="csrf-token"]').attr("content");

  /**
   * Obr-form
   */
  $("form#obr-form").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();

    console.log(data);

    $.ajax({
      type: "post",
      url: "/submit/obratnaj",
      data: data,
      success: function (res) {
        if (res.status == true) {
          let resp = document.querySelector(".obr-resp");
          resp.innerHTML = "<h3>" + res.text + "<h3><br>";
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  });

  /**
   * Order-form
   */
  $("form#order-form").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();
	let url = "/submit/order";
    var type = $(this).attr("data-order");

	if(type == 'pay'){
		url = "/submit/order-pay";
	}

    $.ajax({
      type: "post",
      url: url,
      data: data,
      success: function (res) {
        console.log(res);
        if (res.status == true) {		
          const order = document.querySelector(".order");
          const orderSuccess = document.querySelector(".order--success");
          order.style.display = "none";
          orderSuccess.style.display = "block";
		  if(res.urlpay){
			window.location.href = res.urlpay;
		  }

        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});
