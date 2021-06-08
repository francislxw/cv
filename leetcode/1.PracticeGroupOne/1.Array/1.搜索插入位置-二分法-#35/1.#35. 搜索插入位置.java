//1.#35. 搜索插入位置
/*
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
你可以假设数组中无重复元素。
示例 1:
输入: [1,3,5,6], 5
输出: 2
示例 2:
输入: [1,3,5,6], 2
输出: 1
示例 3:
输入: [1,3,5,6], 7
输出: 4
示例 4:
输入: [1,3,5,6], 0
输出: 0
链接：https://leetcode-cn.com/problems/search-insert-position
*/
/*
// 分别处理如下四种情况
// 目标值在数组所有元素之前  [0, -1]
// 目标值等于数组中某一个元素  return middle;
// 目标值插入数组中的位置 [left, right]，return  right + 1                //note: remeber this 规律
// 目标值在数组所有元素之后的情况 [left, right]， return right + 1
*/
/*
时间复杂度：O(logn)
空间复杂度：O(1)
*/

class Solution {
    public int searchInsert(int[] nums, int target) {
        int m=nums.length;
        if(target<nums[0]) return 0;
        if(target>nums[m-1]) return m;
        int lo=0; int hi=m-1;                     // note: n-1
        while(lo<=hi){                            // note: <=
            int mid=lo+(hi-lo)/2;
            int midV=nums[mid];
            if(midV==target){
                return mid;
            } else if(midV>target){
                hi=mid-1;
            }else if(midV<target){
                System.out.println(mid);
                lo=mid+1;
            }
        }
        return hi+1;                              // return lo 也work的

    }
}