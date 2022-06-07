const stock = require("../repository/stock.repository.js");

exports.getList = (req, res) => {
    //req.params 가 있는지 체크
    //있으면 해당 물건의 개수만, 아니면 모든 리스트 리턴
    //repository에서 findOneItem, findAllItem 생성

}

exports.addItem = (req, res) => {
    //유효한item인지 확인 필요
    //repository에서 createItem 생성

}

exports.setOrderNum = (req, res) => {
    //repository에서 updateOrderNum 생성

}