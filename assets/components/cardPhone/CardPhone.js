import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import '../../styles/cardPhone.css'

export default function CardPhone( props ) {
    const {data} = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    const newPrice = (price, percent) => {
        const newPrice = Math.round(price - (price * (percent / 100)));
        return newPrice
    }

    return (
        <>
            <div className="list__phone">
                        {currentItems.map((phone, key) => {
                            return (
                                <div className="item" key={key}>
                                    <Link className="" to={`/show/${phone.id}`}>
                                        <div className="item__img">
                                            <img src={`http://localhost:8000/images/phone/${phone.imageName}`} alt="image téléphone" />
                                        </div>
                                    </Link>
                                    <div className="list__phone__desc">
                                        <h3>
                                            {phone.brand} - {phone.model} - {phone.storage} Go - {phone.color}
                                        </h3>
                                        <p>{phone.description}</p>
                                        <div>
                                            <p className="item__price">
                                                {phone.promotion > 0 ?
                                                    <>
                                                        <span className='item__promo--percent'>
                                                            -{phone.promotion}%
                                                        </span>

                                                        <span className='item__price--old'>
                                                            {phone.price} €
                                                        </span>
                                                        <span>
                                                            {newPrice(phone.price, phone.promotion)} €
                                                        </span>
                                                    </>
                                                    :
                                                    <span>
                                                        {newPrice(phone.price, phone.promotion)} €
                                                    </span>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="suivant >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< précédent"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        </>
    );
}