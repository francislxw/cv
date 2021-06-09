//1.#209. 长度最小的子数组
/*
给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
示例：
输入：s = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。

进阶：

如果你已经完成了 O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-size-subarray-sum
*/

// 滑动窗口

class Solution {
    public int minSubArrayLen(int s, int[] nums) {
        int m=nums.length;
        if(m==0) return 0;
        int lw=0; int rw=0;
        int res=Integer.MAX_VALUE;
        int sublength=0;
        while(rw<=m-1 && lw<=rw){
            sublength+=nums[rw];
            while(sublength >= s){
                res=Math.min(res, rw-lw+1);          
                sublength-=nums[lw];
                lw++;
            }
            rw++;
        }
        return res==Integer.MAX_VALUE?0:res;

    }
}


// from web
//时间复杂度：O(n)
//空间复杂度：O(1)
class Solution {
public:
    int minSubArrayLen(int s, vector<int>& nums) {
        int result = INT32_MAX;
        int sum = 0; // 滑动窗口数值之和
        int i = 0; // 滑动窗口起始位置
        int subLength = 0; // 滑动窗口的长度
        for (int j = 0; j < nums.size(); j++) {
            sum += nums[j];
            // 注意这里使用while，每次更新 i（起始位置），并不断比较子序列是否符合条件
            while (sum >= s) {
                subLength = (j - i + 1); // 取子序列的长度
                result = result < subLength ? result : subLength;
                sum -= nums[i++]; // 这里体现出滑动窗口的精髓之处，不断变更i（子序列的起始位置）
            }
        }
        // 如果result没有被赋值的话，就返回0，说明没有符合条件的子序列
        return result == INT32_MAX ? 0 : result;
    }
};


//二分法

class Solution:
    def minSubArrayLen(self, s: int, nums: List[int]) -> int:
        left, right, res = 0, len(nums), 0
        def helper(size):
            sum_size = 0
            for i in range(len(nums)):
                sum_size += nums[i]
                if i >= size:
                    sum_size -= nums[i-size]
                if sum_size >= s:
                    return True
            return False
        while left<=right:
            mid = (left+right)//2  # 滑动窗口大小
            if helper(mid):  # 如果这个大小的窗口可以那么就缩小
                res = mid
                right = mid-1
            else:  # 否则就增大窗口
                left = mid+1
        return res