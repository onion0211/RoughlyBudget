# RoughlyBudget

## Description
**대충 예산을 짜서 한달 여유자금이 얼마나 되는지 대충 짐작하는 앱**

*(추가) 신용카드를 쓰는 사용자는 카드대금이 빠져나간 진짜 쓸 수 있는 한달 월급 산출 / 안쓰는 사용자는 고정비용, 예상 지출 비용을 제외한 한달 월급 산출*

---
구겨진 종이 이미지 라이선스: 

https://kr.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1189772.htm

작가 aopsan, 출저 Freepik

---


1차 개발 List
- [ ] 버튼 누르면 스샷 찍을 수 있게 하는 라이브러리 찾기(자동으로 갤러리에 저장)
- [x] 버튼 누르면 공유할 수 있는 기능 구현
- [x] Receipt 테마 형태로 여유자금 산출(이쁘게 만들기)
- [x] 버튼 click시 페이지 이동을 할껀지? Flag 걸어서 view 전환을 할껀지? 결정
- [x] 일어날 수 있는 가능성들 다 잡아서 modal 창 띄우는 걸로
    - [x] Modal children을 전부 return 할껀지, 아님 text랑 button만 return 할껀지 결정
    - [x] 리스트 항목 선택 중, 이미 해당 항목이 있을 때
    - [x] 예산 리스트의 총 금액이 한달 고정 수입보다 높을때
        - [x] 아님 예산 리스트 항목을 조정하게 할꺼?
        - [x] 고정 수입을 다시 입력하게 할꺼?
    - [x] 예산 리스트 항목은 있지만 금액을 입력안했을 때
        - [x] 모두 입력 안했을 때
        - [x] 일부분만 입력 안했을 때
    - [x] 한달 고정 수입은 입력했지만 예산 리스트가 없을때
    - [x] 한달 고정 수입 입력안했을 때
---
• 2차 개발 List

To-Do List
- [ ] 사용자가 첫 화면에서 신용카드를 사용하는지? 안하는지 선택(전자일 경우 카후 디자인으로 보여주기)
- [ ] 앱 이름 변경(한방에 알수있는,단순, 명목, 확실하게, 임팩트있는) -> "진짜 월급"으로 할까?...
- [ ] 앱 아이콘 변경
- [ ] 앱 시작화면 변경(너무 촌스러움...)
- [ ] input칸에 "0" placeholder가 왜 표시가 안되는지?(왜 활성화 되어있는지?)
- [ ] 한 달 고정수입 input칸에 onFocus
- [ ] 입력 데이터가 없을 시, 키보드의 지우기 버튼을 누를때 "0"이 연타되는 이슈 수정
- [ ] 대 카테고리 선택 후, 세부 카테고리 설정 or 사용자가 직접 작성 가능
- [ ] 세부 카테고리 선택 시, 대 카테고리의 input에는 세부 카테고리 input들의 합산으로 표기
- [ ] 하단 버튼은 "내가 진짜 쓸 수 있는 금액은?" 이런식으로 수정
- [ ] 영수증을 사진 형식으로도 저장할 수 있게 
- [ ] 큐알 스캔시에 웹 사이트로 이동해서(약간 킹받게 보여줄지? 아님 유익한 정보를 제공해주는 사이트로 이동하게 할지 고민...)
