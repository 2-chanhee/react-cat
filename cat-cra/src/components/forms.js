import React from "react";

// props로 function을 넘겨준다.
export const Forms = ({ updateMainCat }) => {
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value_, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(e) {
    const userValue = e.target.value;

    setErrorMessage("");
    if (includesHangul(userValue))
      setErrorMessage("한글은 입력할 수 없습니다.");

    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (value_ === "") {
      setErrorMessage("값을 입력해주세요");
      return;
    }

    updateMainCat(value_);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="영어 대사를 입력해주세요"
        value={value_} // 위에서 만들어준 동적 value_
        onChange={handleInputChange}
      />
      <button type="submit">생성</button>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </form>
  );
};
