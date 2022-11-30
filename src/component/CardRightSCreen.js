import React, { useEffect, useState } from "react";
import SuccessfulModal from "./SuccessfulModal";

export default function CardRightSCreen(props) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [showNumber, setShowNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({
    card: null,
    expDate: null,
    expYear: null,
    cvc: null,
  });
  const [cards, setCards] = useState([]);
  const [showConfrm, setShowConfirm] = useState(false);

  useEffect(() => {
    let storedCards = JSON.parse(window.localStorage.getItem('cards'));
    if (!storedCards) {
      setCards(card => {
        return [
          ...card,
          storedCards
        ]
      })
    }
  }, [])

  const updateNumber = (e) => {
    let error = errors;
    error.card = '';
    setErrors(error);
    if (
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      (e.keyCode >= 97 && e.keyCode <= 122) ||
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.code === "Backspace"
    ) {
      
      let number = cardNumber;
      let showNum = showNumber;
      if (e.code !== "Backspace") {
        number = cardNumber.replace(/\s/gi, "");
        number += e.key;
        showNum += e.key;
        if (number.length % 4 === 0) {
          number += " ";
          showNum += " ";
        }
        setShowNumber(showNum);
        setCardNumber(number.replace(/\s/gi, ""));
      } else {
        if (showNum.charAt(number.length - 1) === " ") {
          setShowNumber(showNum.slice(0, showNum.length - 1));
        }
        setShowNumber(showNum.slice(0, showNum.length - 1));
        setCardNumber(number.slice(0, number.length - 1));
      }
    }
    if (
      (e.keyCode >= 65 && e.keyCode <= 90)
    ) {
      error["card"] = "Wrong format, numbers only";
      setErrors({...error});
    }
  };

  const addCard = () => {
    let error = errors;
    if (!cardNumber || !month || !year || !cvv) {
      if (!cardNumber) {
        error['card'] = "Can't be blank";
      }
      if (!month) {
        error['month'] = "Can't be blank";
      }
      if (!year) {
        error['year'] = "Can't be blank";
      }
      if (!cvv) {
        error['cvv'] = "Can't be blank";
      }
      setErrors({...error});
      return;
    }
    if (cardNumber.length > 16) {
      console.log('num', cardNumber, cardNumber.length)
      error['card'] = "Card Number should be 16 digits!";
      setErrors({...error});
      return;
    }
    let card = cards;
    let cardObj = {
      name,
      cardNumber,
      month,
      year,
      cvv
    }
    card.push(cardObj);
    setCards([
        ...card
      ]
    );
    window.localStorage.setItem('cards', JSON.stringify(cards));
    setShowConfirm(true);
  }

  const addNewCard = () => {
    setName('');
    setCardNumber('');
    setShowNumber('');
    setErrors({});
    setMonth('');
    setYear('');
    setCvv('');
    setShowConfirm(false);
  }

  return (
    <div className="right-sec-main lg:h-full flex flex-col lg:justify-center md:justify-start items-center">
      {!showConfrm ? (
        <form className="flex flex-col card-form" onSubmit={(e) => e.preventDefault()}>
          <label className="d-block default-font mb-2">CARD HOLDER'S NAME</label>
          <input
            type="text"
            value={name}
            className="input-box default-font"
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jane Appleseed"
          />
          <label className="d-block default-font mt-5 mb-2">Card Number</label>
          <input
            type="text"
            value={showNumber}
            className={"input-box default-font " + 
            (errors && errors.card && errors.card.length ? 'error-input' : '')}
            onKeyDown={(e) => updateNumber(e)}
            placeholder="e.g. 1234 5678 9123 0000"
            maxLength={16}
          />
          {errors && errors.card && errors.card.length ? (
            <label className="error-label">{errors.card}</label>
          ) : null}
          <div className="flex flex-row">
            <div className="flex flex-col">
              <label className="d-block default-font mt-5 mb-2">
                Exp. Date (MM/YY)
              </label>
              <span>
                <input
                  type="text"
                  value={month}
                  maxLength={2}
                  className="input-box default-font exp"
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="MM"
                />
                <input
                  type="text"
                  value={year}
                  maxLength={2}
                  className="input-box default-font ml-2 exp"
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="YY"
                />
              </span>
            </div>
            <div className="flex flex-col ml-5">
              <label className="d-block default-font mt-5 mb-2">CVC</label>
              <input
                type="text"
                value={cvv}
                className="input-box default-font cvv"
                onChange={(e) => setCvv(e.target.value)}
                placeholder="e.g. 123"
                maxLength={3}
              />
            </div>
          </div>
          <button className="confirm-btn default-font mt-5" onClick={addCard}>Confirm</button>
        </form>
      ) : (
        <SuccessfulModal 
          continue={addNewCard}
        />
      )}
    </div>
  );
}
