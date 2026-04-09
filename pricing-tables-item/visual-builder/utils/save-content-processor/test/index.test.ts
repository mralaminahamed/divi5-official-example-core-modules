import { saveContentProcessor } from '../index';

describe('saveContentProcessor', () => {
  describe('Basic functionality', () => {
    test('should convert available features to plus indicators', () => {
      const input = '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li><span>Feature 2</span></li></ul>';
      const expected = '+ Feature 1\n+ Feature 2';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should convert unavailable features to minus indicators', () => {
      const input =
        '<ul class="et_pb_pricing"><li class="et_pb_not_available"><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li></ul>';
      const expected = '- Feature 1\n- Feature 2';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle mixed available and unavailable features', () => {
      const input =
        '<ul class="et_pb_pricing"><li><span>Available Feature</span></li><li class="et_pb_not_available"><span>Unavailable Feature</span></li><li><span>Another Available</span></li></ul>';
      const expected = '+ Available Feature\n- Unavailable Feature\n+ Another Available';

      expect(saveContentProcessor(input)).toBe(expected);
    });
  });

  describe('HTML content preservation', () => {
    test('should preserve HTML tags within span content', () => {
      const input =
        '<ul class="et_pb_pricing"><li><span>Feature with <strong>bold</strong> text</span></li><li class="et_pb_not_available"><span>Feature with <em>italic</em> text</span></li></ul>';
      const expected = '+ Feature with <strong>bold</strong> text\n- Feature with <em>italic</em> text';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should preserve links within span content', () => {
      const input = '<ul class="et_pb_pricing"><li><span>Feature with <a href="#">link</a></span></li></ul>';
      const expected = '+ Feature with <a href="#">link</a>';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should preserve complex HTML within span content', () => {
      const input =
        '<ul class="et_pb_pricing"><li><span>Feature with <strong>bold</strong> and <em>italic</em> and <a href="#">link</a></span></li></ul>';
      const expected = '+ Feature with <strong>bold</strong> and <em>italic</em> and <a href="#">link</a>';

      expect(saveContentProcessor(input)).toBe(expected);
    });
  });

  describe('Edge cases', () => {
    test('should handle empty string', () => {
      const input = '';
      const expected = '';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle null input', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const input = null as any;
      const expected = '';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle undefined input', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-undefined
      const input = undefined as any;
      const expected = '';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should return empty string when no pricing list found', () => {
      const input = '<div>Some other content</div>';
      const expected = '';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should return empty string when ul exists but has no li elements', () => {
      const input = '<ul class="et_pb_pricing"></ul>';
      const expected = '';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle li elements without span', () => {
      const input = '<ul class="et_pb_pricing"><li>Feature without span</li></ul>';
      const expected = '';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle empty span content', () => {
      const input = '<ul class="et_pb_pricing"><li><span></span></li></ul>';
      const expected = '+ ';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle span content with only whitespace', () => {
      const input = '<ul class="et_pb_pricing"><li><span>   </span></li></ul>';
      const expected = '+ ';

      expect(saveContentProcessor(input)).toBe(expected);
    });
  });

  describe('Class variations', () => {
    test('should handle ul with additional classes', () => {
      const input = '<ul class="et_pb_pricing custom-class"><li><span>Feature 1</span></li></ul>';
      const expected = '+ Feature 1';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle li with additional classes', () => {
      const input =
        '<ul class="et_pb_pricing"><li class="et_pb_not_available custom-class"><span>Feature 1</span></li></ul>';
      const expected = '- Feature 1';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle span with additional classes', () => {
      const input = '<ul class="et_pb_pricing"><li><span class="custom-span">Feature 1</span></li></ul>';
      const expected = '+ Feature 1';

      expect(saveContentProcessor(input)).toBe(expected);
    });
  });

  describe('Special characters and formatting', () => {
    test('should handle content with quotes', () => {
      const input = '<ul class="et_pb_pricing"><li><span>Feature with "quotes"</span></li></ul>';
      const expected = '+ Feature with "quotes"';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle content with ampersands', () => {
      const input = '<ul class="et_pb_pricing"><li><span>Feature with & symbols</span></li></ul>';
      const expected = '+ Feature with &amp; symbols';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle content with numbers', () => {
      const input =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li></ul>';
      const expected = '+ Feature 1\n- Feature 2';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle single character content', () => {
      const input =
        '<ul class="et_pb_pricing"><li><span>A</span></li><li class="et_pb_not_available"><span>B</span></li></ul>';
      const expected = '+ A\n- B';

      expect(saveContentProcessor(input)).toBe(expected);
    });
  });

  describe('Real-world scenarios', () => {
    test('should handle typical pricing table content', () => {
      const input =
        '<ul class="et_pb_pricing"><li><span>24/7 Support</span></li><li class="et_pb_not_available"><span>Advanced Analytics</span></li><li><span>Basic Features</span></li></ul>';
      const expected = '+ 24/7 Support\n- Advanced Analytics\n+ Basic Features';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle content from WYSIWYG editor', () => {
      const input =
        '<ul class="et_pb_pricing"><li><span>Email Support</span></li><li class="et_pb_not_available"><span>Phone Support</span></li><li><span>Live Chat</span></li></ul>';
      const expected = '+ Email Support\n- Phone Support\n+ Live Chat';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle complex pricing table with mixed content', () => {
      const input =
        '<ul class="et_pb_pricing"><li><span>Basic Plan - <strong>$10/month</strong></span></li><li class="et_pb_not_available"><span>Premium Features</span></li><li><span>24/7 Support via <a href="#">email</a></span></li></ul>';
      const expected =
        '+ Basic Plan - <strong>$10/month</strong>\n- Premium Features\n+ 24/7 Support via <a href="#">email</a>';

      expect(saveContentProcessor(input)).toBe(expected);
    });
  });

  describe('Malformed HTML handling', () => {
    test('should handle malformed HTML gracefully', () => {
      const input = '<ul class="et_pb_pricing"><li><span>Feature 1</span><li><span>Feature 2</span></ul>';
      const expected = '+ Feature 1\n+ Feature 2';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle unclosed tags', () => {
      const input = '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li><span>Feature 2</span></li>';
      const expected = '+ Feature 1\n+ Feature 2';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle nested ul elements', () => {
      const input =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span><ul><li><span>Nested</span></li></ul></li></ul>';
      const expected = '+ Feature 1\n+ Nested';

      expect(saveContentProcessor(input)).toBe(expected);
    });
  });

  describe('Whitespace handling', () => {
    test('should trim whitespace from span content', () => {
      const input = '<ul class="et_pb_pricing"><li><span>  Feature 1  </span></li></ul>';
      const expected = '+ Feature 1';

      expect(saveContentProcessor(input)).toBe(expected);
    });

    test('should handle multiple spaces and tabs', () => {
      const input = '<ul class="et_pb_pricing"><li><span>  \t  Feature 1  \t  </span></li></ul>';
      const expected = '+ Feature 1';

      expect(saveContentProcessor(input)).toBe(expected);
    });
  });
});
