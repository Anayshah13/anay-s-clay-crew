for _ in range(int(input())):
    n = int(input())
    a = list(map(int, input().split()))
    output=[]
    
    for i in range(n):
        greater ,lesser =0,0
        c=0
        for j in range(i+1 ,n):
            if a[j] > a[i]:
                greater += 1
            elif a[j] < a[i]:
                lesser += 1
        output.append(max(greater, lesser))
    print(* output)