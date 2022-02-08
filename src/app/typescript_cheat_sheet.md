# containers 

## Array

array[index] = value
array.splice(index, 1)
array.length
if (index in array)
if (array.includes(value)) 
for (const index in array)
for (const value of array)

## Records (= Object!)

record[key] = value
if (key in record)
if (record.includes(value)) 
for (const key in record)
for (const value of Object.values(record))
for (const [key, value] of Object.entries(record))

## Map

map.get(key, default?)
map.set(key, value)
map.delete(key)
if (map.has(key))
for (const key of map.keys())
for (const value of map.values())
for (const [key, value] of map)
map.clear()

## Set

set.add|delete(member)
set.size
if (set.has(member))
set.clear()
