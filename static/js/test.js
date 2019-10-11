console.log('hello world')

let xhr = new XMLHttpRequest()

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText)
    alert('成功获取到ajax数据')
  }
}

xhr.open('GET', '/test/dev')
xhr.send()