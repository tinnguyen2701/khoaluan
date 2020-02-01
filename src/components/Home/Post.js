/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Div = styled.div`
  padding-left: 40px;
  padding-top: 60px;
  padding-bottom: 20px;
  padding-right: 20px;
  opacity: ${props => (props.isVisibleLoading ? '0.2' : '1')};
`;

const DefaultContent = styled.div`
  padding-left: 40px;
  padding-top: 60px;
  padding-bottom: 20px;
  padding-right: 20px;
`;

const Post = ({ post, isVisibleLoading }) => {
  return (
    <div>
      {post && (
        <Div isVisibleLoading={isVisibleLoading}>
          <p style={{ color: 'steelblue', fontSize: '30px' }}>{post.name}</p>
          <div className="Container" dangerouslySetInnerHTML={{ __html: post.describe }}></div>
          {post.homeWork && (
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontSize: '24px' }}>Home Work</p>
              {post.homeWork.map((item, index) => (
                <div key={index.toString()}>{item.question}</div>
              ))}
            </div>
          )}
        </Div>
      )}
      {window.location.href.split('/')[window.location.href.split('/').length - 2] != 'About' &&
        window.location.href.split('/')[window.location.href.split('/').length - 2] !=
          'Manuals' && (
          <DefaultContent>
            <img
              src="https://viblo.asia/uploads/f920b42c-1347-4295-a120-69b1f3b76236.png"
              alt="image-logo"
            />
            <p style={{ fontSize: '30px', marginTop: '20px' }}>I. Giới thiệu về MongoDB</p>
            <p style={{ fontSize: '22px' }}>1. Khái niệm</p>
            <p>
              MongoDB là một chương trình cơ sở dữ liệu mã nguồn mở được thiết kế theo kiểu hướng
              đối tượng trong đó các bảng được cấu trúc một cách linh hoạt cho phép các dữ liệu lưu
              trên bảng không cần phải tuân theo một dạng cấu trúc nhất định nào. Chính do cấu trúc
              linh hoạt này nên MongoDB có thể được dùng để lưu trữ các dữ liệu có cấu trúc phức tạp
              và đa dạng và không cố định (hay còn gọi là Big Data).
            </p>
            <p style={{ fontSize: '22px' }}>
              2. Lợi thế của MongoDB so với các cơ sở dữ liệu dạng quan hệ(RDBMS)
            </p>
            <ul style={{ paddingLeft: '50px' }}>
              <li>
                Ít Schema hơn: MongoDB là một cơ sở dữ liệu dựa trên Document, trong đó một
                Collection giữ các Document khác nhau. Số trường, nội dung và kích cỡ của Document
                này có thể khác với Document khác.
              </li>
              <li>Cấu trúc của một đối tượng là rõ ràng.</li>
              <li>Không có các Join phức tạp.</li>
              <li>
                Khả năng truy vấn sâu hơn. MongoDB hỗ trợ các truy vấn động trên các Document bởi sử
                dụng một ngôn ngữ truy vấn dựa trên Document mà mạnh mẽ như SQL.
              </li>
              <li>MongoDB dễ dàng để mở rộng.</li>
              <li>
                Việc chuyển đổi/ánh xạ của các đối tượng ứng dụng đến các đối tượng cơ sở dữ liệu là
                không cần thiết.
              </li>
              <li>
                Sử dụng bộ nhớ nội tại để lưu giữ phần công việc, giúp truy cập dữ liệu nhanh hơn.
              </li>
            </ul>
            <p style={{ fontSize: '22px' }}>3. Một số đặc điểm của MongoDB</p>
            <ul style={{ paddingLeft: '50px' }}>
              <li>Kho lưu định hướng Document: Dữ liệu được lưu trong các tài liệu kiểu JSON.</li>
              <li>Lập chỉ mục trên bất kỳ thuộc tính nào.</li>
              <li>Các truy vấn đa dạng.</li>
              <li>Cập nhật nhanh hơn.</li>
            </ul>
          </DefaultContent>
        )}
      {(window.location.href.split('/')[window.location.href.split('/').length - 2] == 'About' ||
        window.location.href.split('/')[window.location.href.split('/').length - 2] == 'Manuals') &&
        post == null && <DefaultContent>Waitting..</DefaultContent>}
    </div>
  );
};

export default connect(state => ({
  post: state.post,
  isVisibleLoading: state.isVisibleLoading,
}))(Post);
