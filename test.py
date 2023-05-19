global_Value = 5
test = [ 1,1,2,3,4,5 ]

def sum_to_goal(my_list, goal_number):
    result = 0
    for i in my_list:
        # if i < len(my_list) - 1:
            for j in my_list:
                if (my_list[i] + my_list[j]) == goal_number:
                    result =  my_list[i] * my_list[i+1]
                    return result

    return result

print(sum_to_goal(test, 4))