fetch('http://127.0.0.1:5000/report/')
    .then(response => response.json())
    .then(report => {
        let map_customers = {}
        report.best_costumers.forEach((customer, i) => {
            map_customers[`name${i + 1}`] = customer.client_name
        });
        report.best_customers = map_customers
        let date = new Date(report.month_more_revenue.month);
        report.month_more_revenue.month = date.toLocaleString("en-US", { month: "long"});
        let template = createReportTemplate(report);
        $("#report").append(template);
    });


function createReportTemplate(report) {
    let template = $("#report-template")[0].innerHTML;
    return Mustache.render(template, report);
}
