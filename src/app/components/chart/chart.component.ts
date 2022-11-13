import { Component, OnInit, Input, IterableDiffers, DoCheck } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { objCollatzStats } from '../../collatz';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, DoCheck {

  /* Inject IterableDiffers into the component through the constructor */
  constructor(private arrayIterableDiffers: IterableDiffers) { }
  
  /* Receive data from the parent component (variable is initialised locally to an empty []) */
  @Input() dataArray: objCollatzStats[] = [];

  /* Tracks array itteration changes */
  arrayIterableTracker: any;

  /* Initialized to '0' because angular is bitching about it if it's not */
  stepsChart: any = 0; 

  ngOnInit(): void {
    /* Initialize array iterable tracker to null */
    this.arrayIterableTracker = this.arrayIterableDiffers.find([]).create(undefined);

    /* Create an empty chart that will be updated with the updates to the data array */
    this.createStepsChart();
  }

  ngDoCheck() {
    /* 'ngDoCheck' fires wildly, we check if it hit the intended target here */
    const dataArrayChanges = this.arrayIterableTracker.diff(this.dataArray);

    /* Check and update the chart both for the additions and the removals */
    if (dataArrayChanges) {
      dataArrayChanges.forEachAddedItem((record: any) => {
        const collatzItem = record.item;
        this.stepsChart.data.labels.push(collatzItem.seed);
        this.stepsChart.data.datasets[0].data.push(collatzItem.oddSteps);
        this.stepsChart.data.datasets[1].data.push(collatzItem.evenSteps);
      });

      /* 
      * dataArrayChanges.forEachRemovedItem((record: any) => {
      *   const collatzItem = record.item;
      * });
      * 
      * a lot of playing with indexes will be going here when the time comes...
      * This is supposed to handle removals but at this time nothing ever gets removed, so this is a TODO! 
      */

      /* Do the visual update of the chart */
      this.stepsChart.update();
    }
  }

  createStepsChart () {
    Chart.register(...registerables);

    this.stepsChart = new Chart("stepsChart", {
      type: 'bar',
      data: {
        labels: [], /* Filled as the dataArray is updated by the main component */
        datasets: [
          {
          label: '3x + 1',
          data: [], /* Filled as the dataArray is updated by the main component */
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'x / 2',
          data: [], /* Filled as the dataArray is updated by the main component */
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
