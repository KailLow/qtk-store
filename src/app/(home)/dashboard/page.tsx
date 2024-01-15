"use client"

import Chart from 'chart.js/auto';
import { useEffect } from 'react';


export default function Report(){
    useEffect(() => {
        const data = [
          { year: 2010, count: 10 },
          { year: 2011, count: 20 },
          { year: 2012, count: 15 },
          { year: 2013, count: 25 },
          { year: 2014, count: 22 },
          { year: 2015, count: 30 },
          { year: 2016, count: 28 },
        ];
    
        const canvas = document.getElementById('acquisitions');
        const ctx = canvas?.getContext('2d');
    
        let chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(row => row.year),
            datasets: [
              {
                label: 'Acquisitions by year',
                data: data.map(row => row.count),
              },
            ],
          },
        });
    
        return () => {
          chart.destroy();
        };
      }, []);
    return(
        <main className="min-h-screen max-w-screen pt-2 px-4">
            <div className=" w-[800px]"><canvas id="acquisitions"></canvas></div>
        </main>
    )
}