const creator = 'kt'

function getBookList() {
    axios({
        url: 'https://hmajax.itheima.net/api/books',
        params: {
            creator
        }
    }).then(result => {
        console.log(result)
        console.log(result.data.data)
        bookList = result.data.data
        const htmlStr = bookList.map((item, id) => {
            return `<tr>
                    <td>${id+1}</td>
                    <td>${item.bookname}</td>
                    <td>${item.author}</td>
                    <td>${item.publisher}</td>
                    <td class='delAndEdit'>
                        <span class="del">删除</span>
                        <span class="edit">编辑</span>
                    </td>
                </tr>`
        }).join('')
        document.querySelector('.list').innerHTML = htmlStr
    })
}

getBookList()