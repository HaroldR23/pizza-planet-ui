fetch('http://127.0.0.1:5000/report/')
    .then(response => response.json())
    .then(report => {
        if(report.length === 0) {
            let reportEmptyTemplate = createReportEmptyTemplate({message:"Don't forget populate the database"});
            $("#report").append(reportEmptyTemplate)
        } else {
            let map_customers = {}
            report.best_costumers.forEach((customer, i) => {
                map_customers[`name${i + 1}`] = customer.client_name
            });
            report.best_customers = map_customers
            let date = new Date(report.month_more_revenue.month);
            report.month_more_revenue.month = date.toLocaleString("en-US", { month: "long"});
            let template = createReportTemplate(report);
            $("#report").append(template);
        }
    });


function createReportTemplate(report) {
    let template = $("#report-template")[0].innerHTML;
    return Mustache.render(template, report);
}

function createReportEmptyTemplate(message) {
    let template = $("#report-empty")[0].innerHTML;
    return Mustache.render(template, message);
}