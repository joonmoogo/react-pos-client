import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import ReceiptUtil from './ReceiptUtil.ts';
import ChartUtil from './ChartUtil.ts'
import TimeUtil from './moment.ts';

export default function VerticalBarDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const timeUtil = new TimeUtil();
    const todayMonth = timeUtil.getMonth();
    const todayDate = timeUtil.getDate();
    const today = (ReceiptUtil.parse(ReceiptUtil.filterByDate(todayMonth,todayDate)));
    const todayTotal = (ChartUtil.getSalesTotal(today));
    const todayAverage = (ChartUtil.getAverage(today));
    const todayMax = (ChartUtil.getMaxVal(today));
    const todayMin = (ChartUtil.getMinVal(today));
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['yesterday','today','tomorrow'],
            datasets: [
                {
                    label: 'daily sales',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [0,todayTotal,0]
                },
                {
                    label: 'Average sales',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [0,todayAverage,0]
                },
                {
                    label: 'Max sales',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [0,todayMax,0]
                },
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}