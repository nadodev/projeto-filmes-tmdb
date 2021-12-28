import React, { useEffect, useState } from "react";
import { Col, Pagination } from "react-bootstrap";

import "./style.css";

function MainPagination({ ...props }) {
  const { handler_current_page, current_page, last_page, loading } = props;

  const [listPagination, setListPagination] = useState([]);

  useEffect(() => {
    var list = [];
    for (var i = current_page; i < current_page + 5; i++) {
      if (i == current_page && current_page > 2) {
        list.push(current_page - 2);
      }
      if (i == current_page && current_page > 1) {
        list.push(current_page - 1);
      }

      if (i <= last_page) {
        list.push(i);
      }
    }

    setListPagination(list);
  }, [loading]);

  return (
    <div className="d-flex flex-wrap my-2 my-md-5">
      <Col xs={12} md={4}>
        <div className="container-pagination d-flex justify-content-center">
          <Pagination>
            {current_page > 1 && (
              <Pagination.First
                title={"Voltar para primeira página"}
                onClick={() => handler_current_page(1)}
              />
            )}
            {listPagination.map((item) => {
              return (
                <Pagination.Item
                  key={item}
                  active={current_page === item}
                  onClick={() => handler_current_page(item)}
                  className="pagination-item bg-primary"
                >
                  {item}
                </Pagination.Item>
              );
            })}
            {current_page < last_page && (
              <Pagination.Last
                title={"Ir para última página"}
                onClick={() => handler_current_page(last_page)}
              />
            )}
          </Pagination>
        </div>
      </Col>

      <Col xs={12} md={4} />
    </div>
  );
}

export default MainPagination;
