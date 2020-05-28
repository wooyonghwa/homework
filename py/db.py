from pymongo import MongoClient

def db_connect():
    client = MongoClient('localhost',27017)
    db = client.mydb
    return db

def db_insert(doc):
    db_result = db_connect()
    if db_result is not None:
        db_result.musics.insert(doc)
        return True
    return False    

def db_find_all():
    db_result = db_connect()
    if db_result is not None:
        return db_result.musics.find({})
    return None

#def db_update(doc):
#    db.musics.update_one(doc)