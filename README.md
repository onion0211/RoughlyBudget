# 💰 RoughlyBudget

## 📝 Description
**- 대충 예산을 짜서 한달 여유자금이 얼마나 되는지 대충 짐작하는 앱**

*- (추가) 신용카드를 쓰는 사용자는 카드대금이 빠져나간 진짜 쓸 수 있는 한달 월급 산출 / 안쓰는 사용자는 고정비용, 예상 지출 비용을 제외한 한달 월급 산출*

---
구겨진 종이 이미지 라이선스: 

https://kr.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1189772.htm

작가 aopsan, 출저 Freepik

---


• 📍 1차 개발 List


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

**📺 result screen**
<div>
    <img width="200" src="https://github.com/onion0211/RoughlyBudget/assets/110289407/14d57acf-3406-40b5-9219-d74b62919ddd">
    <img width="200" src="https://github.com/onion0211/RoughlyBudget/assets/110289407/4ec2d9f0-67e6-4314-83fc-390ac640a124">
    <img width="200" src="https://github.com/onion0211/RoughlyBudget/assets/110289407/227ec5c5-a8c7-49af-9938-a2ba3a4589ce">
</div>

---

• 📍 2차 개발 List

To-Do List
- [x] 영수증을 사진 형식으로도 저장할 수 있게
- [x] 큐알 스캔시에 웹 사이트로 이동해서(약간 킹받게 보여줄지? 아님 유익한 정보를 제공해주는 사이트로 이동하게 할지 고민...)
- [x] 카후 선택시, 월급에서 카드값 계산 하면 마이너스일 수 있으니까 영수증 화면에서 다음달에는 ~미리 빠져 나간다.. 처럼 보여주기(더 나은 방법 연구) -> 큐알 스캔시 텍스트 형식으로 보여줌
- [x] 하단 버튼은 "내가 진짜 쓸 수 있는 금액은?" 이런식으로 수정 -> “진짜 월급은?”으로 수정
- [x] 세부 카테고리 선택 시, 대 카테고리의 input에는 세부 카테고리 input들의 합산으로 표기
- [x] 대 카테고리 선택 후, 세부 카테고리 설정 or 사용자가 직접 작성 가능
- [x] 한 달 고정수입 input칸에 onFocus
- [x] input칸에 "0" placeholder가 왜 표시가 안되는지?(왜 활성화 되어있는지?)
- [x] 입력 데이터가 없을 시, 키보드의 지우기 버튼을 누를때 "0"이 연타되는 이슈 수정 -> 애초에 “”로 둬서 placeHolder가 보이도록 수정
- [x] splashScreen보여주고 난 후 흰 화면 보여주고 type화면 나오는 이슈 수정 -> 일단 splah화면을 보여주는걸로 해결?…함
- [x] 사용자가 첫 화면에서 신용카드를 사용하는지? 안하는지 선택(전자일 경우 카후 디자인으로 보여주기)
- [x] 앱 시작화면 변경(너무 촌스러움...) -> 앱 로고화면으로 수정
- [x] 앱 이미지 변경하기 -> “진짜 월급”으로 고침(만원의 녹색을따라 로고 변경)
- [x] 앱 이름 변경(한방에 알수있는,단순, 명목, 확실하게, 임팩트있는) -> “진짜 월급”으로 수정


---
