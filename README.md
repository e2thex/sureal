SUReAL - Sureal Users Restfully Access Lists
========

Sureal is a restful api for access list of arbtrary data.  The data paradam is basicily triplets of subject predicate and object with weight.

ReSTful API
=========
So in a system if one wanted to access Joe's last name from the contacts datastore they might ask for

/contacts/joe/lastname

But if they wanted to access his 3 child they could access

/contact/joe/child/2

This why one can have a way to consistantly get back order data.  

If one wants to add Add a new child at the top of the list they would submit a PUT to

/contact/joe/child

at the end of the list

/contact/joe/child/end

to update a child they would to a POST to the child wanted

/contact/joe/child/2

the same with a remove by posting a DELETE

Query
------
One will also beable to find a node by query.  The query language is xpath insprired using [] as where clause and .PREDICATE as a path to a new node
Here are some examples

To find all the zip codes that have someone name james living in them you might do

\*[.firstname = 'james'].address.zip

Using {} allows one to do a where on the predicate, so lets say you want to know all of Joes children you could pass the following query to the joe access point
.{VALUE ='son' OR VALUE = 'Daughter'}

Note that VALUE lets you reference the name of the current item. if both son and daughter had a property of type of releation one could do the following
.{.typeOfRel = 'child'}

One can also walk the web in the oppiste direction by useing .<PREDICATE so to do our first example one could do
zip[.<address.firstname = 'james']

This is the full recusive tree

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

Each tranaction is record as a triplet update. such as

PUT: NULL -> (joe, child, sally, 596747395739593)
POST: (joe, child, sally, 596747395739593) -> (joe, child, sal, 596747395739593)
DELETE  (joe, child, sal, 596747395739593) -> NULL

each of this transaction can be stored with a time stamp.

Beacuse of the atomic nature of each of these transaction, they can be combined with other transation async , rolled back and foward again with little fear of data corubtion.

Transaction API
--------------

There is a transation that lets one subscribe pull and push transaciton from one system to another.  

In the long run there will be ways to attach meta data to this transaction so one will know where they have come from and maybe even attach meta data to the generated triplets with permissions and such.
