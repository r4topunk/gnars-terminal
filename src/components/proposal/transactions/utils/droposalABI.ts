const DroposalABI = [
    {
        inputs: [
            { internalType: "string", name: "name", type: "string" },
            { internalType: "string", name: "symbol", type: "string" },
            { internalType: "uint64", name: "editionSize", type: "uint64" },
            { internalType: "uint16", name: "royaltyBPS", type: "uint16" },
            { internalType: "address payable", name: "fundsRecipient", type: "address" },
            { internalType: "address", name: "defaultAdmin", type: "address" },
            {
                components: [
                    { internalType: "uint104", name: "publicSalePrice", type: "uint104" },
                    { internalType: "uint32", name: "maxSalePurchasePerAddress", type: "uint32" },
                    { internalType: "uint64", name: "publicSaleStart", type: "uint64" },
                    { internalType: "uint64", name: "publicSaleEnd", type: "uint64" },
                    { internalType: "uint64", name: "presaleStart", type: "uint64" },
                    { internalType: "uint64", name: "presaleEnd", type: "uint64" },
                    { internalType: "bytes32", name: "presaleMerkleRoot", type: "bytes32" }
                ],
                internalType: "struct IERC721Drop.SalesConfiguration",
                name: "saleConfig",
                type: "tuple"
            },
            { internalType: "string", name: "description", type: "string" },
            { internalType: "string", name: "animationURI", type: "string" },
            { internalType: "string", name: "imageURI", type: "string" }
        ],
        name: "createEdition",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "nonpayable",
        type: "function"
    }
];

export default DroposalABI;