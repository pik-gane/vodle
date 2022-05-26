# don't use

x ||= f(), because f will not be called if x==true!

# containers 

## Array

array[index]
array[index] = value
array.splice(index, 1)
array.length
if (INDEX IN array)
if (array.INCLUDES(VALUE)) 
for (const INDEX IN array)
for (const VALUE OF array)
array.sort((n1,n2)=>n1-n2) // otherwise numbers are sortes like strings!!

## Records (= Object!)

record[key]
record[key] = value
delete record[key]
if (KEY IN record)
if (record.INCLUDES(VALUE)) 
for (const KEY IN record)
for (const VALUE OF Object.values(record))
for (const [key, value] of Object.entries(record))

## Map

map.GET(key, default?)
map.SET(key, value)
map.delete(key)
if (map.has(key))
for (const KEY OF map.KEYS())
for (const VALUE OF map.VALUES())
for (const [key, value] of map)
map.clear()

## Set

set.add|delete(member)
set.size
if (set.has(member))
for (const member of set)
set.clear()
