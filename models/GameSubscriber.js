// models/subscriber.js
"use strict";

/**
 * Listing 17.2 (p. 242)
 * 구독자 스키마에 유효성 평가자 추가
 */
const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema(
    {
      name: {
        // name 속성 요청
        type: String,
        required: true,
      },
      email: {
        // email 속성 요청 lowercase 속성 추가
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      phoneNumber: {
        // phoneNumber 속성 요청 (zipCode 대신)
        type: String,
      },
      newsletter: {
        type: Boolean,
      },
      profileImg: {
        type: String,
      },
      courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    },
    {
      timestamps: true,
    }
  );

/**
 * 노트: email 속성에서 사용된 unique 옵션은 유효성 평가자는 아니며 Mongoose 스키마의
 * 헬퍼에 가깝다. 헬퍼는 경우에 따라 유효성 평가자와 같이 동작을 하는 메소드 같은 것이다.
 */

/**
 * Listing 17.3 (p. 243)
 * 스키마에 인스턴스 메소드 추가
 */
// 구독자의 Full info를 구하기 위한 인스턴스 메소드 추가
subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Phone: ${this.phoneNumber}`;
};

// 전화번호를 사용하여 구독자를 찾는 인스턴스 메소드 추가 (findLocalSubscribers 대신)
subscriberSchema.methods.findPhone = function () {
  return this.model("GameSubscriber")
    .find({ phoneNumber: this.phoneNumber })
    .exec();
};

// email 속성을 소문자로 변환하는 인스턴스 메소드 추가
subscriberSchema.methods.lowercaseEmail = function () {
  this.email = this.email.toLowerCase();
  return this.email;
};

module.exports = mongoose.model("GameSubscriber", subscriberSchema);

