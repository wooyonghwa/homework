from flask import Flask, render_template, jsonify, request
app = Flask(__name__)
import json

from pymongo import MongoClient           # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)
client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.mydb                      # 'mydb'라는 이름의 db를 만듭니다.

## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('shoppingmall.html')

## API 역할을 하는 부분
@app.route('/order', methods=['POST'])
def order():
    orderman_name = request.form['orderman_name']
    order_list = request.form['order_list']
    order_addr = request.form['order_addr']
    order_phone = request.form['order_phone']

    doc={
         "orderman_name":orderman_name,
         "order_list":order_list,
         "order_addr":order_addr,
         "order_phone":order_phone
    }
    db.orderlist.insert_one(doc)
    return jsonify({'result':'success', 'msg': '주문이 완료 되었습니다.'})


@app.route('/orderListing', methods=['GET'])
def order_list():
    order_list = list(db.orderlist.find({},{'_id':0}))
    
    return jsonify({'result':'success','order_list':order_list})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)