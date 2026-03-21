for _ in range(int(input())):
    n, c, k = map(int, input().split())
    A = list(map(int, input().split()))
    A.sort()
    
    rem = k
    for ai in A:
        if c >= ai:
            f = min(rem, c - ai)
            rem -= f
            c += ai + f
    
    print(c)