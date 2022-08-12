"use strict";

class Cistercian{
    constructor(num,resolution,color){
        this.numbers = `${num}`.split('');
        this.resolution = resolution;
        this.color = color || getComputedStyle(document.body).getPropertyValue('color');
        this.root = [0,-1,0,1];
        
        this.quadrants = [
            {x: 1, y: 1},
            {x: -1, y: 1},
            {x: 1, y: -1},
            {x: -1, y: -1}
        ];
        this.configurations = this.findConfigurations();
    }
    print(){
        
    }
    configure(num,quadrant){
        // 1's p1(x: (x*Res)*Q1.x, (y*Res)*Q1.y)
        
        switch(num){
            case "0":
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ]
                ];
            case "1":
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ],
                    [
                        0,
                        (2*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (2*-this.resolution)*quadrant.y
                    ]
                ];
            case "2":
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ],
                    [
                        0,
                        (1*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (1*-this.resolution)*quadrant.y
                    ]
                ];
            case "3":
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ],
                    [
                        0,
                        (2*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (1*-this.resolution)*quadrant.y
                    ]
                ];
            case "4":
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ],
                    [
                        0,
                        (1*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (2*-this.resolution)*quadrant.y
                    ]
                ];
            case "5": 
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ],
                    [
                        0,
                        (2*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (2*-this.resolution)*quadrant.y
                    ],
                    [
                        0,
                        (1*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (2*-this.resolution)*quadrant.y
                    ]
                ];
            case "6":
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ],
                    [
                        (1*this.resolution)*quadrant.x,
                        (1*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (2*-this.resolution)*quadrant.y
                    ]
                ];
            case "7":
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ],
                    [
                        0,
                        (2*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (2*-this.resolution)*quadrant.y
                    ],
                    [
                        (1*this.resolution)*quadrant.x,
                        (1*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (2*-this.resolution)*quadrant.y
                    ]
                ];
            case "8":
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ],
                    [
                        0,
                        (1*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (1*-this.resolution)*quadrant.y
                    ],
                    [
                        (1*this.resolution)*quadrant.x,
                        (1*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (2*-this.resolution)*quadrant.y
                    ]
                ];
            case "9": 
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ],
                    [
                        0,
                        (2*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (2*-this.resolution)*quadrant.y
                    ],
                    [
                        0,
                        (1*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (1*-this.resolution)*quadrant.y
                    ],
                    [
                        (1*this.resolution)*quadrant.x,
                        (1*-this.resolution)*quadrant.y,
                        (1*this.resolution)*quadrant.x,
                        (2*-this.resolution)*quadrant.y
                    ]
                ];
            default:
                return [
                    [
                        0,
                        (2*this.resolution)*-1,
                        0,
                        (2*this.resolution)
                    ]
                ];
        }
    }
    findConfigurations(){
        const numConfigs = [];
        const len = this.numbers.length;
        for(let i = 0; i < len; i++){
            const target = this.numbers[i];
            const  quad = this.quadrants[len - (i + 1)];
            //console.log(target,quad,i)
            numConfigs.push(this.configure(target,quad))
        }
        return numConfigs;
    }
    renderRoot(ctx){
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.resolution * .1;
        ctx.lineCap = 'round';
        ctx.moveTo(this.root[0]*this.resolution,this.root[1]*this.resolution);
        ctx.lineTo(this.root[2]*this.resolution,this.root[3]*this.resolution);
        // ctx.closePath();
        ctx.stroke();
    }
    renderConfig(ctx){
        ctx.save();
        ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
        this.configurations.forEach( (configuration,index) =>{
            //console.log(`Configuration${index+1}: ` + configuration)
            configuration.forEach( (set,index) => {
                //console.log(`Set${index+1}: ` + set);
                ctx.save();
                ctx.translate(this.root[0]*this.resolution,this.root[1]*this.resolution);
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.resolution * .1;
                ctx.lineCap = 'round';
                ctx.moveTo(set[0],set[1]);
                ctx.lineTo(set[2],set[3]);
                // ctx.closePath();
                ctx.stroke();
                ctx.restore();
            })
        });
        ctx.restore();
    }
    render(ctx){
        //this.renderRoot(ctx);
        
        this.renderConfig(ctx)
    }
}