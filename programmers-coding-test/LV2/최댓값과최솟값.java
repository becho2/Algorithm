class Solution {
    public String solution(String s) {
        String answer = "";

        String[] arr = s.split(" ");
        int maxValue = Integer.parseInt(arr[0]);
        int minValue = Integer.parseInt(arr[0]);
        int a = 0;
        for (int i = 1; i < arr.length; i++) {
            a = Integer.parseInt(arr[i]);
            if (a > maxValue) {
                maxValue = a;
            }
            if (a < minValue) {
                minValue = a;
            }
        }
        answer = minValue + " " + maxValue;
        return answer;
    }
}