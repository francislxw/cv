//1.#59. 螺旋矩阵 II
/*
给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
示例:
输入: 3
输出:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]

链接：https://leetcode-cn.com/problems/spiral-matrix-ii
*/
//矩阵中间的位置，需要特殊处理： 例如：n为3， 中间的位置就是(1，1)，n为5，中间位置为(2, 2)

// myself, works， java
class Solution {
    public int[][] generateMatrix(int n) {
        int row=n; int col=n;
        int[][] res=new int[row][col];
        int tol=1;int startRow=0; int startCol=0;
        int endRow=row-1; int endCol=col-1;
        while(tol<=n*n && startRow<= endRow && startCol<=endCol){
            //1.first row
            for(int i=startCol;i<endCol;i++){
                res[startRow][i]=tol;
                tol++;
            }
            // right col
            for(int j=startRow;j<endRow;j++){
                res[j][endCol]=tol;
                tol++;
            }
            //bottoom row
            for(int i=endCol; i>startCol; i--){
                res[endRow][i]=tol;
                tol++;
            }
            // first col
            for(int j=endRow;j>startRow;j--){
                res[j][startCol]=tol;
                tol++;
            }
            startRow++;
            endRow--;
            endCol--;
            startCol++;
        }
        // tackle the middle part of the nxn if n is the old
        if(n%2 !=0){
            res[n/2][n/2] = tol;
        }
        return res;

    }
}

//c++ myself
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector(n, 0));
        int loops = n/2;
        int mid = n/2;
        int offset=1;   //(]
        int tol=1; int i, j;
        int startx=0, starty=0;
        while(loops--){
            i=startx;
            j=starty;
            for(j=starty; j<starty+n-offset; j++){
                res[startx][j]=tol++;
            }
            for(i=startx; i<startx+n-offset; i++){
                res[i][j]=tol++;
            }
            for(;j>starty;j--){
                res[i][j]=tol++;
            }
            for(;i>startx;i--){
                res[i][j]=tol++;
            }
            startx++;
            starty++;

            offset +=2;
        }

        // tackle the middle part 
        if(n%2){
            res[mid][mid]=tol;
        }

        return res;
    }
};


//from webpage, good grammer, c++

class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector<int>(n, 0)); // 使用vector定义一个二维数组
        int startx = 0, starty = 0; // 定义每循环一个圈的起始位置
        int loop = n / 2; // 每个圈循环几次，例如n为奇数3，那么loop = 1 只是循环一圈，矩阵中间的值需要单独处理
        int mid = n / 2; // 矩阵中间的位置，例如：n为3， 中间的位置就是(1，1)，n为5，中间位置为(2, 2)
        int count = 1; // 用来给矩阵中每一个空格赋值
        int offset = 1; // 每一圈循环，需要控制每一条边遍历的长度
        int i,j;
        while (loop --) {
            i = startx;
            j = starty;

            // 下面开始的四个for就是模拟转了一圈
            // 模拟填充上行从左到右(左闭右开)
            for (j = starty; j < starty + n - offset; j++) {
                res[startx][j] = count++;
            }
            // 模拟填充右列从上到下(左闭右开)
            for (i = startx; i < startx + n - offset; i++) {
                res[i][j] = count++;
            }
            // 模拟填充下行从右到左(左闭右开)
            for (; j > starty; j--) {
                res[i][j] = count++;
            }
            // 模拟填充左列从下到上(左闭右开)
            for (; i > startx; i--) {
                res[i][j] = count++;
            }

            // 第二圈开始的时候，起始位置要各自加1， 例如：第一圈起始位置是(0, 0)，第二圈起始位置是(1, 1)
            startx++;
            starty++;

            // offset 控制每一圈里每一条边遍历的长度
            offset += 2;
        }

        // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
        if (n % 2) {
            res[mid][mid] = count;
        }
        return res;
    }
};
