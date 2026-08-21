# Classic Delhi Metro Route Finder Makefile
CXX = clang++
CXXFLAGS = -std=c++14 -O2 -Wall

# Detect OS compiler fallback
ifeq ($(shell which clang++ 2>/dev/null),)
	CXX = g++
endif

TARGET = metro

all: $(TARGET)

$(TARGET): metro.cpp
	$(CXX) $(CXXFLAGS) metro.cpp -o $(TARGET)
	@echo "Built $(TARGET) successfully!"
	@echo "Run with: ./metro"

clean:
	rm -f $(TARGET) metro.exe *.o

.PHONY: all clean
