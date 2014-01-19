SUReAL - Sureal Users Restfully Access Lists
========

Sureal is a restful api for access list of arbitrary data.  The data paradigm is basically triplets of subject predicate and object with weight.

ReSTful API
=========
So in a system if one wanted to access Joe's last name from the contacts data store they might ask for

    /contacts/joe/lastname

But if they wanted to access his 3 child they could access

    /contact/joe/child/2

This why one can have a way to consistently get back order data.  

If one wants to add Add a new child at the top of the list they would submit a POST to

    /contact/joe/child

at the end of the list

    /contact/joe/child/end

to update a child they would to a PUT to the child wanted

    /contact/joe/child/2

the same with a remove by posting a DELETE

Query
------
One will also be able to find a node by query.  The query language is xpath inspired using [] as where clause and .PREDICATE as a path to a new node
Here are some examples

To find all the zip codes that have someone name james living in them you might do

    \*[.firstname = 'james'].address.zip

Using {} allows one to do a where on the predicate, so lets say you want to know all of Joe's children you could pass the following query to the joe access point

    .{VALUE ='son' OR VALUE = 'Daughter'}

Note that VALUE lets you reference the name of the current item. if both son and daughter had a property of type of relation one could do the following

    .{.typeOfRel = 'child'}

One can also walk the web in the opposite direction by using .<PREDICATE so to do our first example one could do

    zip[.<address.firstname = 'james']

This is the full recursive tree

    Query : Trail
    Trail : Trail_Item Trail
    Trail : Trail_Item
    Trail_Item : getFromPredicateValue
    Trail_Item : getFromPredicateWhere
    Trail_Item : getPredicate
    Trail_Item : [Where_Item]
    Trail_Item : getSelf
    getSelf : VALUE
    getFromPredicateValue : ."STRING"
    getFromPredicateValue : .<"STRING"
    getFromPredicateValue : .>"STRING"
    getFromPredicateValue : .><"STRING"
    getFromPredicateWhere : .{Where_Item}
    getFromPredicateWhere : .>{Where_Item}
    getFromPredicateWhere : .<{Where_Item}
    getFromPredicateWhere : .><{Where_Item}
    getPredicate : @
    WhereClause : trailExists
    WhereClause : trailCompare
    WhereClause : WhereClause AND WhereClause
    WhereClause : WhereClause OR WhereClause
    trailExists : Trail EXISTS
    trailCompare : Trail = "STRING"
    trailCompare : Trail < "STRING"
    trailCompare : Trail > "STRING"
    trailCompare : Trail != "STRING"
    trailCompare : Trail CONTAINS "STRING"
    trailCompare : = "STRING"
    trailCompare : < "STRING"
    trailCompare : > "STRING"
    trailCompare : != "STRING"
    trailCompare : CONTAINS "STRING"

Transactions
============

Each transaction is record as a triplet update. such as

    POST: NULL -> (joe, child, sally, 596747395739593)
    PUT: (joe, child, sally, 596747395739593) -> (joe, child, sal, 596747395739593)
    DELETE  (joe, child, sal, 596747395739593) -> NULL

each of this transaction can be stored with a time stamp.

Because of the atomic nature of each of these transaction, they can be combined with other transaction asynchronously , rolled back and forward again with little fear of data corruption.

Transaction API
--------------

There is a transaction that lets one subscribe pull and push transaction from one system to another.  

In the long run there will be ways to attach meta data to this transaction so one will know where they have come from and maybe even attach meta data to the generated triplets with permissions and such.
