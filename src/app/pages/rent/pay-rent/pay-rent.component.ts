import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from "sweetalert2";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-pay-rent',
  templateUrl: './pay-rent.component.html',
  styleUrls: ['./pay-rent.component.scss']
})
export class PayRentComponent implements OnInit {

  //table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {
      name: "Tiger Nixon",
      typeDoc: "System Architect",
      office: "Edinburgh",
      clientId: "61",
      date: "2011/04/25",
      salary: "A320800",
      status: "Success",
      apiName: "/account_user/",
      apiVersion: "1.0.3",
      totalCall: "123",
      amount: "RM100.00"
    },
    {
      name: "Garrett Winters",
      typeDoc: "Accountant",
      office: "Tokyo",
      clientId: "63",
      date: "2011/07/25",
      salary: "B170750",
      status: "Cancel",
      apiName: "/profix_fpx/",
      apiVersion: "2.9.8",
      totalCall: "764",
      amount: "RM100.00"
    },
    {
      name: "Ashton Cox",
      typeDoc: "Junior Technical Author",
      office: "San Francisco",
      clientId: "66",
      date: "2009/01/12",
      salary: "C846000",
      status: "Success",
      apiName: "/exchange_rate/",
      apiVersion: "3.0.1",
      totalCall: "342",
      amount: "RM100.00"
    },
    {
      name: "Cedric Kelly",
      typeDoc: "Senior Javascript Developer",
      office: "Edinburgh",
      clientId: "22",
      date: "2012/03/29",
      salary: "D433060",
      status: "Cancel",
      apiName: "/account_user/",
      apiVersion: "1.1.0",
      totalCall: "466",
      amount: "RM100.00"
    },
    {
      name: "Airi Satou",
      typeDoc: "Accountant",
      office: "Tokyo",
      clientId: "33",
      date: "2008/11/28",
      salary: "E162700",
      status: "Success",
      apiName: "/profix_fpx/",
      apiVersion: "2.6.5",
      totalCall: "468",
      amount: "RM100.00"
    },
  ];
  SelectionType = SelectionType;

  //datepickerrange
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  //modal
  modalRef: BsModalRef;

  // Chart
  private chart1: any
  private chart2: any

  constructor(
    private zone: NgZone,
    private modalService: BsModalService,
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key
      };

    });

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.getCharts();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chart1) {
          console.log('Chart disposed')
          this.chart1.dispose()
        }
        if (this.chart2) {
          console.log('Chart disposed')
          this.chart2.dispose()
        }
      }
    )
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      this.getChartPay1()
      this.getChartPay2()
    })
  }

  getChartPay1() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdivpayrent1", am4charts.XYChart);

    // Add data
    chart.data = [{
      "year": "Jan",
      "italy": 1,
      "germany": 5,
    }, {
      "year": "Feb",
      "italy": 1,
      "germany": 2,
    }, {
      "year": "Mar",
      "italy": 2,
      "germany": 3,
    }, {
      "year": "Apr",
      "italy": 3,
      "germany": 4,
    }, {
      "year": "May",
      "italy": 5,
      "germany": 1,
    }, {
      "year": "June",
      "italy": 3,
      "germany": 2,
    }, {
      "year": "July",
      "italy": 1,
      "germany": 2,
    }, {
      "year": "Aug",
      "italy": 2,
      "germany": 1,
    }, {
      "year": "Sep",
      "italy": 3,
      "germany": 5,
    }, {
      "year": "Oct",
      "italy": 4,
      "germany": 3,
    }, {
      "year": "Nov",
      "italy": 1,
      "germany": 2,
    }, {
      "year": "Dec",
      "italy": 4,
      "germany": 2,
    }];

    // Create category axis
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.opposite = true;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inversed = true;
    valueAxis.title.text = "Place taken";
    valueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "italy";
    series1.dataFields.categoryX = "year";
    series1.name = "Success";
    series1.bullets.push(new am4charts.CircleBullet());
    series1.tooltipText = "{name} in {categoryX}: {valueY}";
    series1.legendSettings.valueText = "{valueY}";
    series1.visible = false;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "germany";
    series2.dataFields.categoryX = "year";
    series2.name = 'Fail';
    series2.bullets.push(new am4charts.CircleBullet());
    series2.tooltipText = "{name} in {categoryX}: {valueY}";
    series2.legendSettings.valueText = "{valueY}";

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";


    let hs1 = series1.segments.template.states.create("hover")
    hs1.properties.strokeWidth = 5;
    series1.segments.template.strokeWidth = 1;

    let hs2 = series2.segments.template.states.create("hover")
    hs2.properties.strokeWidth = 5;
    series2.segments.template.strokeWidth = 1;

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.itemContainers.template.events.on("over", function (event) {
      let segments = event.target.dataItem.dataContext as any;
      segments.each(function (segment) {
        segment.isHover = true;
      })
    })

    chart.legend.itemContainers.template.events.on("out", function (event) {
      let segments = event.target.dataItem.dataContext as any;
      segments.each(function (segment) {
        segment.isHover = false;
      })
    })

    this.chart1 = chart;
  }

  getChartPay2() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdivpayrent2", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          "property": "cursor",
          "value": "pointer"
        }
      ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [{
      "country": "Cheque",
      "litres": 501.9
    }, {
      "country": "Deposit",
      "litres": 165.8
    }, {
      "country": "Online Banking",
      "litres": 139.9
    }, ];

    this.chart2 = chart;
  }

  entriesChange($event){
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {

      for(var key in d){
        if(d[key].toLowerCase().indexOf(val) !== -1){
          return true;
        }
      }
      return false;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{class:"modal-lg"});
  }

  successSwal(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task + "!",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
    this.modalRef.hide()
  }
}
