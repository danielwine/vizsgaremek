const express = require('express')
const baseService = require('../base/service');
const createError = require('http-errors');

const msgInvalidId = 'Invalid ObjectID'
const msgNotFound = 'Item not found'

const isIdInvalid = (id, next) => {
    if (!id || id.length != 24) {
        next(new createError.BadRequest(msgInvalidId))
        return true
    } else return false
}

module.exports = (service) => {
    return {
        create: (req, res, next) => {
            return service.create(req.body)
                .then(cp => {
                    res.status(201).json(cp);
                })
                .catch(reason => {
                    if (reason.message.includes('ValidationError'))
                        next(new createError.BadRequest(reason.message))
                    else
                        next(
                            new createError.InternalServerError(reason.message))
                })
        },
        findAllIds: (req, res, next) => {
            return service.findAllIds()
                .then(list => res.json(list))
        },
        findOne: (req, res, next) => {
            const id = req.params.id;
            if (isIdInvalid(id, next)) return
            return service.findOne(id)
                .then(item => {
                    if (item == '') {
                        return next(new createError
                            .NotFound(msgNotFound))
                    } else { res.json(item[0]) }
                })
        },
        updateOne: (req, res, next) => {
            const id = req.params.id;
            if (isIdInvalid(id, next)) return
            return service.updateOne(id, req.body)
                .then(entity => {
                    res.json(entity);
                })
                .catch(reason => {
                    if (reason.message.includes('ValidationError'))
                        next(new createError.BadRequest(reason.message))
                    else
                        next(
                            new createError.InternalServerError(reason.message))
                })
        },
        deleteOne: (req, res, next) => {
            const id = req.params.id;
            if (isIdInvalid(id, next)) return
            return service.deleteOne(id)
                .then(item => {
                    if (item == '') {
                        return next(new createError
                            .NotFound(msgNotFound))
                    } else { res.json({}) }
                })
                .catch(reason => {
                    return next(
                        new createError.InternalServerError(reason));
                })
        }
    }
}
