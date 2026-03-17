import json

file_path = r'd:\program\HBuilderProjects\UniappProject\uni-food\data\db.json'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    original_food_list = data.get('foodList', [])
    new_food_list = []
    category_counts = {}

    for food in original_food_list:
        cat_id = food.get('categoryId')
        
        # If no categoryId, keep it (or handle as needed, here we keep it)
        if cat_id is None:
            new_food_list.append(food)
            continue
            
        # Initialize count for this category if not present
        if cat_id not in category_counts:
            category_counts[cat_id] = 0
        
        if category_counts[cat_id] < 5:
            new_food_list.append(food)
            category_counts[cat_id] += 1

    data['foodList'] = new_food_list

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
    print(f"Original count: {len(original_food_list)}")
    print(f"New count: {len(new_food_list)}")

except Exception as e:
    print(f"Error: {e}")
