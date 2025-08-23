"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalUUID = OptionalUUID;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
function OptionalUUID(example, description) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiProperty)({
        example,
        description: description || 'Optional UUID field',
        required: false,
    }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(({ value }) => value === '' ? undefined : value), (0, class_validator_1.ValidateIf)((o) => o !== undefined && o !== null && o !== ''), (0, class_validator_1.IsUUID)());
}
//# sourceMappingURL=optional-uuid.decorator.js.map