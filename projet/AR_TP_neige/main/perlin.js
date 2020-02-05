let perm = permutation(256);


let u = 1/Math.sqrt(2);
let gradients = [[-u,-u],[u,-u],[-u,u],[u,u],[-1,0],[0,-1],[1,0],[0,1]];



function main(n,res){
    let result = [];
    for (i=0;i<n;i++){
        let resAux = [];
        for (j=0;j<n;j++){
            resAux.push(5*perlin(i/res,j/res));
        }
        result.push(resAux);
    }

    return result;
}


function perlin(x,y){
    let [a,b,c,d] = boundingBox(x,y);


    let ii = a[0]&255;
    let jj = a[1]&255;

    let grad1 = perm[ii+perm[jj]]%8;
    let grad2 = perm[ii+perm[jj+1]]%8;
    let grad3 = perm[ii+1+perm[jj]]%8;
    let grad4 = perm[ii+1+perm[jj+1]]%8;

    let v1 = gradients[grad1];
    let v2 = gradients[grad2];
    let v3 = gradients[grad3];
    let v4 = gradients[grad4];


    let contribA = dot(v1,[x-a[0],y-a[1]]);
    let contribB = dot(v2,[x-b[0],y-b[1]]);
    let contribC = dot(v3,[x-c[0],y-c[1]]);
    let contribD = dot(v4,[x-d[0],y-d[1]]);



    let Sx = lissage(x,a[0]);

    let AC = (1-Sx)*contribA+Sx*contribC;
    let BD = (1-Sx)*contribB+Sx*contribD;

    let Sy = lissage(y,a[1]);

    let result = (1-Sy)*AC + Sy*BD;
    return result

}

function boundingBox(x,y){
    let x0 = Math.floor(x);
    let y0 = Math.floor(y);
    return ([[x0,y0],[x0,y0+1],[x0+1,y0],[x0+1,y0+1]]);
}

function permutation(n){
    let res = [];
    for (i=0;i<n;i++){
        res.push(i);
    }

    for (k=0;k<2*n;k++){
        let i = Math.floor(Math.random()*255);
        let j = Math.floor(Math.random()*255);
        let mem = res[i];
        res[i]=res[j];
        res[j]=mem;
    }

    for (i=0;i<n;i++){
        res.push(res[i]);
    }

    return res;
}

function dot(u,v){
    return (u[0]*v[0]+u[1]*v[1]);
}

function lissage(x,x0){
    let dx = x-x0;
    return (3*dx*dx-2*dx*dx*dx);
}