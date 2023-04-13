import {Option} from "antd/es/mentions";
import {Select} from "antd";
import {useState} from "react";
import {categoryData} from "./tikiTopSearchData";

const CategorySelection = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSubSubCategory, setSelectedSubSubCategory] = useState('');

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setSelectedSubCategory('');
        setSelectedSubSubCategory('');
    };

    const handleSubCategoryChange = (value) => {
        setSelectedSubCategory(value);
        setSelectedSubSubCategory('');
    };

    const handleSubSubCategoryChange = (value) => {
        setSelectedSubSubCategory(value);
    };

    const getSubCategories = () => {
        if (selectedCategory) {
            const category = categoryData.find(
                (category) => category.category === selectedCategory
            );
            return category.subCategories.map((subCategory) => (
                <Option key={subCategory.subCategory}>{subCategory.subCategory}</Option>
            ));
        }
        return null;
    };

    const getSubSubCategories = () => {
        if (selectedCategory && selectedSubCategory) {
            const category = categoryData.find(
                (category) => category.category === selectedCategory
            );
            const subCategory = category.subCategories.find(
                (subCategory) => subCategory.subCategory === selectedSubCategory
            );
            return subCategory.subSubCategories.map((subSubCategory) => (
                <Option key={subSubCategory}>{subSubCategory}</Option>
            ));
        }
        return null;
    };

    return (
        <div className={"tiki-top-search"}>
            <Select
                value={selectedCategory}
                placeholder="Select a category"
                style={{ width: 417 }}
                onChange={handleCategoryChange}
            >
                {categoryData.map((category) => (
                    <Option key={category.category}>{category.category}</Option>
                ))}
            </Select>
            <Select
                value={selectedSubCategory}
                placeholder="Select a sub category"
                style={{ width: 417, marginLeft: 20 }}
                onChange={handleSubCategoryChange}
                disabled={!selectedCategory}
            >
                {getSubCategories()}
            </Select>
            <Select
                value={selectedSubSubCategory}
                placeholder="Select a sub sub category"
                style={{ width: 417, marginLeft: 20 }}
                onChange={handleSubSubCategoryChange}
                disabled={!selectedSubCategory}
            >
                {getSubSubCategories()}
            </Select>
        </div>
    );
}

export default CategorySelection;